import { NextPage } from "next";
import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("@/app/components/AdminApp"),{ssr:false});

const Home: NextPage = () => <AdminApp/>;

// function Home(){
//   return <div>Hello World</div>
// }

export default Home;