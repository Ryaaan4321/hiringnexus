import Navigation from "@/components/Navigation";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
      <section>
        <Navigation/>
        {children} 
      </section>
    );
  }
  