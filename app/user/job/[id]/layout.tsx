import Header from "@/components/Header";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div>
                <Header/>
            <section>{children}</section>
        </div>
    )
}