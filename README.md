This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# What is this? 
Hello everyone, this is the final project for the Web Programming course - AY 2023-2024 at "DMI - UNICT"
This is SoulMates, a hypothetical dating site. I chose this project because I knew it would put me in a corner.
In this project I use Next.js with App Routing.
it was my first use of this technology, I come from a modest javascript background, I had never used React or Next. I "learned" these technologies with this project.
I would like to point out that there are errors in the management of SSR and CSR (and maybe other things), they are not performing as they should be. but time was running out.
I really appreciated these technologies and I will delve into this field as best I can, so as to avoid making the same mistakes again in my future projects, which I will certainly do using the aforementioned.

#### NB. This project is just a draft, it's not optimized (at all, lol). But it gave me the opportunity to get my hands dirty and understand a little about this world that fascinates me a lot. It will soon be optimized, both in terms of functionality and aesthetics. And above all the logic of SSR and CSR

## Getting Started
First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How works comunication? 
To start the Server Socket you have to open the `/socket/websocket` folder in your terminale and then write "node socket_server.js" to run the server for comunication.
The server socket run on port 5001, if you get some problem, or the port is already used, you can change with another port like 5050 or other.

## How works comunication? 
Well, the components that use sockets are the components `Chat.jsx` and `InputBox.jsx` in `/matches` folder.
The components use "const socket = io("http://localhost:5001");"  to connect to the server, change the port 5001 in this code if you have changed the port on the `socket_server.js`.

## Learn More


