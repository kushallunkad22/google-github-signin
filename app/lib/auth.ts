import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { signIn } from "next-auth/react";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: 'email', type: 'text', placeholder: '' },
              password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
                
                return {
                    id: "1",
                    name : "kushal",
                    email : "kushal@gmail.com"
                };
            },
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks : {
        session : ({session , token , user} : any) => {
            console.log(session)
            if(session && session.user){
                session.user.id = token.sub;
            }
            return session
        }
      },
      pages : {
        signIn : "/signin"
      }
}