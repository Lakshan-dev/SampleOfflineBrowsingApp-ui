import {Button, Input, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/react";
import {string, z, ZodType} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PostRequests} from "@/hooks/post";

export default function AddUser(props:any) {

    const {onClose, setAddNewRecord, addNewRecord} = props;
    const {addUser} = PostRequests();

    type formData = {
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
    };

    const userFormSchema:ZodType<formData> = z.object({
        name: string().min(2).max(20),
        email: string().email(),
        password: string().min(8).max(12),
        confirmPassword: string(),
    }).refine((data) =>
        data.password === data.confirmPassword,{
        message: "Confirmation message mismatch",
        path: ["confirmPassword"]
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<formData>({resolver: zodResolver(userFormSchema)});

    const submitUserData = async(data:formData) => {
        const response = await addUser(data);
        if (response.status === 200){
            setAddNewRecord(!addNewRecord);
            onClose();
            console.log('New user registered successful!')
        }else{
            console.log('Something went wrong!')
        }
    };

    return (
        <>
            <ModalHeader className={'flex flex-col gap-1'}>Add new user</ModalHeader>
            <ModalBody>
                <Input
                    isRequired
                    type={"text"}
                    label={"Name"}
                    variant={"bordered"}
                    placeholder={"Enter name"}
                    errorMessage={errors.name && errors.name.message}
                    {...register("name")}
                />
                <Input
                    isRequired
                    type={"text"}
                    label={"Email"}
                    variant={"bordered"}
                    placeholder={"Enter email"}
                    errorMessage={errors.email && errors.email.message}
                    {...register("email")}
                />
                <Input
                    isRequired
                    type={"password"}
                    label={"Password"}
                    variant={"bordered"}
                    placeholder={"Enter email"}
                    errorMessage={errors.password && errors.password.message}
                    {...register("password")}
                />
                <Input
                    isRequired
                    type={"password"}
                    label={"Confirm password"}
                    variant={"bordered"}
                    placeholder={"Enter email"}
                    errorMessage={errors.confirmPassword && errors.confirmPassword.message}
                    {...register("confirmPassword")}
                />
            </ModalBody>
            <ModalFooter>
                <Button color={'danger'} variant={'light'} onClick={onClose}>Close</Button>
                <Button color={'primary'} onClick={handleSubmit(submitUserData)}>Register</Button>
            </ModalFooter>
        </>
    )
}