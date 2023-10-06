import {Card, Skeleton} from "@nextui-org/react";
import {useState} from "react";

export default function SkeletonLoader(){
    const [count, setCount] = useState(3);

    const renderCard = () => {
        const cards = [];
        for (let i= 0; i < count; i++){
            cards.push(
                <Card className="w-full space-y-5 p-4 mb-5" radius="sm" key={i}>
                    <div className="space-y-3">
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </Card>
            )
        }
        return cards;
    };

    return (
        <div>
            {renderCard()}
        </div>
    );
}