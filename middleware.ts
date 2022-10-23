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

        // await jwt.isValidToken(token)
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL( `/auth/login?p=${req.nextUrl.pathname}`, req.nextUrl.origin ))
    }

}

export const config = {
    matcher: ['/checkout/:path']
}
