"use client";

import Image from 'next/image'
import PostTable from "@/components/PostTable";
import {useEffect} from "react";

export default function Home() {

    useEffect(()=>{
        if ('serviceWorker' in navigator){ //check, running browser support services workers
            //register a service worker
            navigator.serviceWorker
                .register('/service-worker.js', {scope: '/'}) //{ scope: '/' }) can specify other pages
                .then(registration=> {
                    console.log('scope is: ', registration.scope);

                    //check for updates and reload the page when a new service worker activated
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (installingWorker){
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === 'activated'){
                                    window.location.reload();
                                }
                            }
                        }
                    };
                })
                .catch(error=>console.log('Service worker error found: ',error));
        }
    },[]);

  return (
      <div>
          <div className={'w-full bg-violet-950 p-3'}>
              <h1 className={'flex justify-center text-4xl'}>Js app with service workers</h1>
          </div>
          <div className={'m-5 flex justify-center'}>
              <PostTable/>
          </div>
      </div>
  )
}
