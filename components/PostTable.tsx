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
    Input, Textarea
} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import SkeletonLoader from "@/components/assets/Skeleton";
import AddUser from "@/components/Models/addUser";


export default function PostTable() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen:isOpenUser, onOpen:onOpenUser, onOpenChange:onOpenChangeUser} = useDisclosure();

    const {getPostData,getUserData} = PostRequests();
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
            setPostData(response.data.data);
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
            setUserData(response.data.data);
            setIsLoading(false);
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
            <div className={'flex justify-between'}>
                <h1 className={'text-2xl mb-8 inline-block'}>These are your famous</h1>
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
            {!isLoading && postData.length > 0 && postData.map((post:any,i)=>(
                <table key={i} className={'mb-5 border-b-2 border-b-violet-600 w-full'}>
                    <tbody>
                        <tr>
                            <th className={'w-[100px] text-left'}>Title:</th>
                            <td>{post.title}</td>
                        </tr>
                        <tr>
                            <th className={'w-[100px] text-left'}>Sub Title:</th>
                            <td>{post.subTitle}</td>
                        </tr>
                        <tr>
                            <th className={'w-[100px] text-left'}>Body:</th>
                            <td>{post.body}</td>
                        </tr>
                        {post.email &&
                            <tr>
                                <th className={'w-[100px] text-left'}>Email:</th>
                                <td>{post.email}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            ))}

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
            {!isLoading && userData.length > 0 && userData.map((user:any,i)=>(
                <table key={i} className={'mb-5 border-b-2 border-b-violet-600 w-full'}>
                    <tbody>
                    <tr>
                        <th className={'w-[100px] text-left'}>Name:</th>
                        <td>{user.name}</td>
                    </tr>
                    {user.email &&
                        <tr>
                            <th className={'w-[100px] text-left'}>Email:</th>
                            <td>{user.email}</td>
                        </tr>
                    }
                    </tbody>
                </table>
            ))}
        </div>

    );
}