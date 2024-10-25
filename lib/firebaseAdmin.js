import admin from 'firebase-admin'

if(admin.app.length){
    admin.initializeApp({
        credential:admin.credential.cert({
            projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
            privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        })
    })
}

export const setAdminClaims = async(uid)=>{
    try{
        await admin.auth()
    }
    catch(error){

    }
}

export default admin