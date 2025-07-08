import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await connectToDatabase()
        const videos= await Video.find({}).lean;

        if(!videos || videos.length===0){
            return NextResponse.json([], {status: 200} )
        }

        return NextResponse.json(videos)
    } catch (error) {
        console.error("Failed to fetch videos",error);
        return NextResponse.json(
            {error: "Failed to fetch videos"},
            {status: 500}, 
        )
    }
}

export async function POST(request: NextRequest){

    try {
        const session = await getServerSession(authOptions);   //Authentication for uploading user be user
    
        if(!session){                                           
            return NextResponse.json(
                {error: "Unauthorized Access"},
                {status: 401}, 
            )
        }

        await connectToDatabase();                          

        const body: IVideo=await request.json()

        if(                                             // validating the required fields before uploading 
            !body.title ||
            !body.description ||
            !body.thumbnailUrl ||
            !body.videoUrl
        ){
            return NextResponse.json(                   // if any of the field not provided return error
                {error: "Missing Required Field"},
                {status: 401}, 
            )
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
             transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
             }
        }

        const newVideo = await Video.create(videoData)

        NextResponse.json(newVideo)

    } catch (error) {
        console.error("failed upload video", error);
        return NextResponse.json(
            { error: "Failed to upload video"},
            {status: 500}
        );
    }
}