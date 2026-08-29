/* =========================================
   PIANO ACADEMY
   PROTECTION PREMIUM
========================================= */

const SUPABASE_URL =
  "https://swsvnzjeipcobodntajs.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_JrPeCn1LhCNHY3BJZ5iCEQ_mc2iqLpf";


const premiumSupabase =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================
   VÉRIFIER L'ACCÈS PREMIUM
========================================= */

async function checkPremiumAccess(){

  try {

    /* Vérifier la connexion */

    const {
      data: sessionData,
      error: sessionError
    } =
      await premiumSupabase.auth.getSession();


    if(sessionError){

      throw sessionError;

    }


    const session =
      sessionData.session;


    /* Aucun utilisateur connecté */

    if(!session){

      window.location.href =
        "connexion.html";

      return false;

    }


    /* Récupérer le profil */

    const {
      data: profile,
      error: profileError
    } =
      await premiumSupabase

      .from("profiles")

      .select("plan")

      .eq(
        "id",
        session.user.id
      )

      .maybeSingle();


    if(profileError){

      throw profileError;

    }


    /* Vérifier le plan */

    const plan =
      String(
        profile?.plan || "free"
      ).toLowerCase();


    if(plan !== "premium"){

      window.location.href =
        "premium.html";

      return false;

    }


    /* Accès autorisé */

    return true;


  } catch(error){

    console.error(
      "Erreur vérification Premium :",
      error
    );


    alert(
      "Impossible de vérifier votre abonnement."
    );


    window.location.href =
      "premium.html";


    return false;

  }

}