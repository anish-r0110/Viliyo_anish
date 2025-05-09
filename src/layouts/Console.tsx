import { RootState } from "@/store";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";


const ConsoleLayout = (props: PropsWithChildren) => {

 const { auth:{ user }  } =  useSelector(( state:RootState)=> state)
 const router = useRouter()

  useEffect(() => {
    if( !user ){
       router.push('/login')
    }
  },[
    user
  ])

  return (
    <>
        { props.children}
    </>
  );
};

export default ConsoleLayout;
