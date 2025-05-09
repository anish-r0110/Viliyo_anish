import NotePadApplication from "@/components/notepad";
import { AppPage } from "@/layouts/types";


const NotepadPage:AppPage = () => {

    return ( <div className="h-screen w-screen">
        <NotePadApplication />
    </div> )
}

export default NotepadPage;
NotepadPage.Layout = 'Admin';
