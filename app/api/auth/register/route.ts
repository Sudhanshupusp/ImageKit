import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest){
    try {

        // Destructure email and password from the incoming JSON request body
        // This assumes the frontend is sending a POST request with these fields
        const {email, password} = await request.json();     

        // Validate that both email and password are provided
        // If either is missing, the request should be rejected early
        if(!email || !password){                
            return NextResponse.json(           
                {error : "Email and Password are required"},
                {status : 400}
            )
        }

        // Establish a connection to the database
        // Since Next.js can run on edge or serverless environments, always await DB connection
        await connectToDatabase()       
        

        // Check if a user with the given email already exists in the database
        // This prevents duplicate account creation for the same email address
        const existingUser = await User.findOne({email}) 


        // If a user is found, return an appropriate error response (e.g. 409 Conflict)
        // This helps maintain unique user records and improves UX
        if(existingUser){                           
             return NextResponse.json(              
                {error : "User already exist!"},
                {status : 400}
            )
        }

        // Since database operations are asynchronous, use `await` to handle the promise correctly
        // This ensures the API waits for the DB response before continuing
        await User.create ({            
            email,                      
            password
        })

        return NextResponse.json(
                {message : "User registered Successfully"},
                {status : 400}
        )

        // throws error if anything goes wrong in user registration
    } catch (error) {                                       
        console.error("user registration failed", error)
        return NextResponse.json(
                {error : "Failed to registered"},
                {status : 400}
        )
    }
}