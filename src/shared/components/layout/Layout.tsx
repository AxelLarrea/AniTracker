import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
  return (
    <>
      <Header />
      <div className="min-h-screen max-w-[1200px] flex flex-col mx-auto">
        { children }  
      </div>
      <Footer />
    </>
  )
}
 
export default Layout;
