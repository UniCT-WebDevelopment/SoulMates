import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-black text-white container mx-auto'>
        <div className='flex p-4 justify-between items-start'>
            <section className='cursor-pointer'>
                <h3 className='text-xl font-bold'>Legale :</h3>
                <ul className='text-sm'>
                    <li className='hover:text-red-600'>Privacy</li>
                    <li className='hover:text-red-600'>Informativa sulla Privacy dei dati dei consumatori</li>
                    <li className='hover:text-red-600'>Condizioni</li>
                    <li className='hover:text-red-600'>Infomrativa sui Cookie</li>
                    <li className='hover:text-red-600'>Proprietà intellettuale</li>
                </ul>
            </section>
            <section className='cursor-pointer'>
                <h3 className='text-xl font-bold'>Lavora con noi :</h3>
                <ul className='text-sm'>
                    <li className='hover:text-red-600'>Portale offerte</li>
                    <li className='hover:text-red-600'>Blog tecnico</li>
                </ul>
            </section>
            <section className='cursor-pointer'>
                <h3 className='text-xl font-bold'>Social :</h3>
                <ul className='text-sm'>
                    <li className='hover:text-red-600'>Instagram</li>
                    <li className='hover:text-red-600'>Facebook</li>
                    <li className='hover:text-red-600'>LinkedIn</li>
                    <li className='hover:text-red-600'>TikTok</li>
                </ul>
            </section>
            <section className='cursor-pointer'>
                <ul className='text-sm'>
                    <li className='hover:text-red-600'>Domande frequenti</li>
                    <li className='hover:text-red-600'>Destinazioni</li>
                    <li className='hover:text-red-600'>Sala stampa</li>
                    <li className='hover:text-red-600'>Contatti</li>
                    <li className='hover:text-red-600'>Codice Promozionale</li>
                </ul>
            </section>
        </div>
        <hr className="my-4 border-t-2 border-gray-600" />
        <div className='p-4 text-xs'>
            <p>
                Single del mondo, udite udite: se siete alla ricerca dell'amore, di un appuntamento o semplicemente di qualcosa a cuor leggero, non potete non essere su Tinder. Con oltre 55 miliardi di match ottenuti fino a oggi, è il posto dove fare nuove amicizie. Diciamoci la verità: trovare persone nuove è molto diverso oggi, ci si incontra molto spesso online. Con Tinder, l'app di incontri gratis più popolare al mondo, avrai milioni di altri single a portata di match, tutti pronti per incontrare qualcuno come te. Che tu sia single o parte della comunità LGBTQIA, Tinder è qui per accendere quella scintilla.
            </p>
            <br/>
            <p>
                Su Tinder c'è davvero qualcosa per tutti. Cerchi una relazione? Si trova. Vuoi trovare nuovi amici? Garantito. Hai appena traslocato e vuoi incontrare facce nuove? Ci pensa Tinder. Tinder non è un sito di incontri come tutti gli altri: è l'app di appuntamenti più varia che ci sia, dove gente di ogni tipo e con storie tutte diverse si incontra per parlare, conoscersi, incontrarsi e poi chi lo sa.  
            </p>
        </div>
        <hr className="my-4 border-t-2 border-gray-600" />
        <div className='p-4 text-xs' >
            <span>Domande frequenti / Consigli per la sicurezza / Condizioni / Informativa sui Cookie / Impostazioni privacy</span>

        </div>
    </div>  
  )
}

export default Footer