import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { pb } from "@/pocketbase"

export function Gallery({ arr }) {
    // arr is already filtered by tags
    //console.log(arr)
    console.log(arr)

    function tagsToList(tagList){
        return(JSON.stringify(tagList))
    }

    const whatItsFor = []
    for (let obj of arr) {
        whatItsFor.push(<div key={obj.id}>
            <Card>
                <CardHeader>
                    <CardTitle>{obj.description}</CardTitle>
                    <CardDescription>{tagsToList(obj.tags)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{/*obj.image*/}</p>
                    <img src={pb.files.getURL(obj, obj.image)} width="100"/>
                </CardContent>
                <CardFooter>
                    <p>{obj.model}</p>
                    <p>This was uploaded on {obj.created}</p>
                </CardFooter>
            </Card>
        </div>)
    }
    return (
        <div>
            {whatItsFor}
        </div>
    )
}