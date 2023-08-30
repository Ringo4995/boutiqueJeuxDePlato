import { useContext } from 'react'
import { BoutiqueContext } from '../../BoutiqueContext'
import './Bouton.css'

const Bouton = (props)=>{
    const boutiqueContext = useContext(BoutiqueContext)
    function handleClick(){
        boutiqueContext.decrementQte(props.id)
        //pour appeler la qte de l'article associé à mon bouton je vais devoir passer par :
        // console.log(boutiqueContext[0][props.id].qte);

        // console.log(props.id);
        // boutiqueContext[1](); équivaut à setStateArticles(...)
        // il va falloir récupérer l'id du bouton pour l'article dont js doit modifier le qte
    }
    let isActive = boutiqueContext.articles[props.id].qte === 0 ? true : false
    return (
        <button onClick={()=>{handleClick()}}
        disabled = {isActive}
        className='bouton'
        >Acheter</button>
    )
}

export default Bouton