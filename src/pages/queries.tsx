import { QueriesTabContent, QueryForm } from "@/components/queries";
import { BackNavigation } from "@/components/shared";
import IQuery from "@/interfaces/Query";
import { AppPage } from "@/layouts/types";
import { AppDispatch, RootState } from "@/store";
import { fetchQueries } from "@/store/reducers/queries";
import { Dialog } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../components/tabs/Tabs";

const QueriesPage: AppPage = () => {

  const queries = useSelector((state:RootState) => state.queries );
  const  dispatch = useDispatch<AppDispatch>();
  let [tabData, setTabData] = useState();

  useEffect(() =>{
    const getQueryList = async () => {
      if( !queries.items.length ) return;
        let tabs: any = {};
        let privateQueries = queries.items.filter((el: IQuery) => el.type.toLowerCase() === "private").reverse();
        let publicQueries = queries.items.filter(
          (el: IQuery) => el.type.toLowerCase() === "public"
        );
  
        (tabs["Public Queries" + "(" + publicQueries.length + ")"] = [
          {
            id: 1,
            TabContent: <QueriesTabContent queries={publicQueries} />,
          },
        ]),
          (tabs["Private Queries" + "(" + privateQueries.length + ")"] = [
            {
              id: 1,
              TabContent: <QueriesTabContent queries={privateQueries} />,
            },
          ]),
          setTabData(tabs);
    };
    getQueryList();
  },[ queries.items.length ])

  useEffect(() => {
     dispatch(fetchQueries());
  },[])

  return (
    <div className={`h-full py-2 w-full `}>
      <BackNavigation title="Queries" />    
      <div>
        <div className=" w-auto  px-2  mobile:overflow-hidden ">
          <div
            className={`font-bold text-[14px]  text-left flex justify-end px-4 mobile:w-full mobile:text-xs mobile:items-center tablet:text-xs  border-black `}
          >
            <Dialog.Root>
              <Dialog.Trigger>
                <div className="flex space-x-2">
                  <p className="py-2 text-app-blue">
                    Have questions to ask the trainer? Raise a query.
                  </p>
                  <button className="rounded-full bg-app-blue text-white px-4">
                    New Query
                  </button>
                </div>
              </Dialog.Trigger>
              <Dialog.Content
                style={{ maxWidth: 550 }}
                className="space-y-4 bg-violet-50 rounded-lg "
              >
               <QueryForm />
              </Dialog.Content>
            </Dialog.Root>
          </div>
          {tabData && <Tabs data={tabData}></Tabs>}
        </div>
      </div>
    </div>
  );
};
export default QueriesPage;
QueriesPage.Layout = "Admin";




