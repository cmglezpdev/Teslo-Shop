import { NextRequest, NextResponse } from 'next/server';

// TODO: Ver como importar paquetes externos aqui
// import { jwt } from './services';

export async function middleware ( req:NextRequest ) {
    
    const token = req.cookies.get('token') || '';
    try {
        // TODO: Temporal solution. remplace by 
        // await jwt.isValidToken( token );
        if( token.length <= 10 )
            throw new Error(); 
    } catch (error) {
        return NextResponse.redirect(new URL( `/auth/login?p=${req.nextUrl.pathname}`, req.nextUrl.origin ))
    }

    // TODO: Validar que el usuario tenga el rol necesario para acceder a la ruta
    // const validRoles = ['admin', 'super-admin', 'SEO'];
    // if( req.nextUrl.pathname === '/admin') {
    //     if( !validRoles.includes( useRole ) )
    //         return NextResponse.redirect(new URL( `/`, req.nextUrl.origin ))
    // }
    
    return NextResponse.next();

    // TODO: Validar las rutas del  admin endpoint (VIDEO 10, Seccion 21)

}

export const config = {
    matcher: ['/checkout/:path', '/admin']
}
