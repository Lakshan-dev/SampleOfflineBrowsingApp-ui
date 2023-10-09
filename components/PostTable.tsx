"use client";

import React, {useEffect, useState} from "react";
import {PostRequests} from "@/hooks/post";
import AddPost from "@/components/Models/addPost";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input, Textarea, Divider, Card, CardHeader, CardBody, CardFooter, Link, Image, Tabs, Tab, User
} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import SkeletonLoader from "@/components/assets/Skeleton";
import AddUser from "@/components/Models/addUser";


export default function PostTable() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen:isOpenUser, onOpen:onOpenUser, onOpenChange:onOpenChangeUser} = useDisclosure();

    const {getPostData,getUserData,removePost,removeUser} = PostRequests();
    const [postData, setPostData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [addNewRecord, setAddNewRecord] = useState(false);

    const handleCache = async() => {
        const newCache = await caches.open('new-cache');
        await newCache.add('/');
    };

    const getData = async() => {
        setIsLoading(true);
        try {
            const response = await getPostData();
            setPostData(response.data);
            setIsLoading(false);
        }catch (error){
            setIsLoading(false);
            console.log('Error fetching data: ',error);
        }
    }

    const fetchUserData = async() => {
        setIsLoading(true);
        try {
            const response = await getUserData();
            setUserData(response.data);
            setIsLoading(false);
        }catch (error){
            setIsLoading(false);
            console.log('Error fetching data: ',error);
        }
    }

    const handleRemove = async(id:any) => {
        setIsLoading(true);
        try {
            const response = await removePost(id);
            console.log('Post removed');
            await setAddNewRecord(!addNewRecord);
        }catch (error){
            setIsLoading(false);
            console.log('Error fetching data: ',error);
        }
    }

    const handleRemoveUser = async(id:any) => {
        setIsLoading(true);
        try {
            const response = await removeUser(id);
            console.log('User removed');
            await setAddNewRecord(!addNewRecord);
        }catch (error){
            setIsLoading(false);
            console.log('Error fetching data: ',error);
        }
    }

    useEffect(() => {
        handleCache();
    }, [postData]);

    useEffect(() => {
        getData();
        fetchUserData();
    }, [addNewRecord]);



    return (
        <div className={'w-2/3'}>
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options">
                    <Tab key="photos" title="Posts">
                        <Card>
                            <CardBody>
                                <div className={'flex justify-between'}>
                                    <h1 className={'text-2xl mb-8 inline-block'}>Top posts</h1>
                                    <Button onClick={onOpen}>ADD NEW</Button>
                                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                        <ModalContent>
                                            {(onClose) => (
                                                <AddPost onClose={onClose} setAddNewRecord={setAddNewRecord} addNewRecord={addNewRecord}/>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </div>
                                {isLoading && <SkeletonLoader/>}
                                <div className={'grid grid-cols-3 gap-5'}>
                                    {!isLoading && postData.length > 0 && postData.map((post:any,i)=>(
                                        <Card className="max-w-[400px]" key={i} isHoverable shadow={'lg'}>
                                            <CardHeader className="flex gap-3">
                                                <Image
                                                    alt="nextui logo"
                                                    height={40}
                                                    radius="sm"
                                                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                                    width={40}
                                                />
                                                <div className="flex flex-col">
                                                    <p className="text-md">{post.title}</p>
                                                    <p className="text-small text-default-500">{post.email}</p>
                                                </div>
                                                <div className={'flex hover:cursor-pointer'} onClick={()=>handleRemove(post._id)}>
                                                    <Image
                                                        alt="nextui logo"
                                                        height={20}
                                                        radius="sm"
                                                        src="/delete.png"
                                                        width={20}
                                                    />
                                                </div>
                                            </CardHeader>
                                            <Divider/>
                                            <CardBody>
                                                <h3 className={'m-2'}>{post.subTitle}</h3>
                                                <hr/>
                                                <p>{post.body}</p>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="music" title="Users">
                        <Card>
                            <CardBody>
                                <div className={'flex justify-between'}>
                                    <h1 className={'text-2xl mb-8 inline-block'}>Registered Users Details</h1>
                                    <Button onClick={onOpenUser}>REGISTER</Button>
                                    <Modal isOpen={isOpenUser} onOpenChange={onOpenChangeUser}>
                                        <ModalContent>
                                            {(onClose) => (
                                                <AddUser onClose={onClose} setAddNewRecord={setAddNewRecord} addNewRecord={addNewRecord}/>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </div>
                                {isLoading && <SkeletonLoader/>}
                                <div className={'grid grid-cols-3 gap-5'}>
                                    {!isLoading && userData.length > 0 && userData.map((user:any,i)=>(
                                        <Card className="max-w-[400px]" key={i} isHoverable shadow={'lg'}>
                                            <CardHeader className="flex gap-3">
                                                <Image
                                                    alt="nextui logo"
                                                    height={40}
                                                    radius="sm"
                                                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                    width={40}
                                                />
                                                <div className="flex flex-col">
                                                    <p className="text-md">{user.name}</p>
                                                    <p className="text-small text-default-500">{user.email}</p>
                                                </div>
                                                <div className={'flex hover:cursor-pointer'} onClick={()=>handleRemoveUser(user.id)}>
                                                    <Image
                                                        alt="nextui logo"
                                                        height={20}
                                                        radius="sm"
                                                        src="/delete.png"
                                                        width={20}
                                                    />
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
            <Divider className={'mt-5 mb-2'}/>
            <p>@lakshan</p>
        </div>

    );
}