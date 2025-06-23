import Header from "@/components/Header";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div>
            {/* <div className="sticky"> */}
                <Header/>
            {/* </div> */}
            <section>{children}</section>
        </div>
    )
}