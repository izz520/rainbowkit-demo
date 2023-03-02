import React, { ReactNode } from 'react';



const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div>头部</div>
            {children}
            <div>尾部</div>
        </div>
    )
}
export default Layout;