
import React, {useState} from "react";
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
import {PostRequests} from "@/hooks/post";
import {z, string, ZodType} from "zod";
import { type } from "os";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddPost(props:any){
    const {onClose, setAddNewRecord, addNewRecord} = props;

    const {addPost} = PostRequests();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    type formData = {
        title: string,
        subTitle: string,
        body: string,
        email: string,
    }

    const postFormSchema:ZodType<formData> = z.object({
        title: string().min(2).max(20),
        subTitle: string().min(5).max(50),
        body: string().min(10),
        email: string().email(),
    });

    const {register, handleSubmit, formState: {errors}} = useForm<formData>({
        resolver: zodResolver(postFormSchema)
    });

    const submitData = async(data:formData) => {
        const response = await addPost(data);
        if(response.status === 200){
            setAddNewRecord(!addNewRecord);
            console.log('New post recorded!');
            onClose();
        }else{
            console.log('Something went wrong!');
        }
    };

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Add new post</ModalHeader>
            
            <ModalBody>
                <Input
                    isRequired
                    type="text"
                    label="Title"
                    variant="bordered"
                    placeholder="Enter post title"
                    errorMessage={errors.title && errors.title.message}
                    {...register(("title"))}
                />
                <Input
                    isRequired
                    type="text"
                    label="Sub Title"
                    variant="bordered"
                    placeholder="Enter post sub title"
                    errorMessage={errors.subTitle && errors.subTitle.message}
                    {...register(("subTitle"))}
                />
                <Textarea
                    isRequired
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    variant={"bordered"}
                    minRows={3}
                    errorMessage={errors.body && errors.body.message}
                    {...register(("body"))}
                />
                <Input
                    type="email"
                    label="Your Email (Optional)"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    errorMessage={errors.email && errors.email.message}
                    {...register(("email"))}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                    Close
                </Button>
                <Button color="primary" onClick={handleSubmit(submitData)}>
                    Add
                </Button>
            </ModalFooter>
        </>
    );
}