import { useContext } from "react"
import { BoutiqueContext } from "../../BoutiqueContext"
import { MenuContext } from "../../MenuContext"
import { Text, View, Image, StyleSheet, ImageBackground } from "react-native"
import { Button } from "react-native-paper"

const Panier = () => {
    const boutiqueContext = useContext(BoutiqueContext)
    const menuContext = useContext(MenuContext)
    const paniertmp = [];
    if (boutiqueContext.tabPanier.length > 0) {
        const tabPanier = boutiqueContext.tabPanier.sort();
        let i = 0;
        tabPanier.map((valeur, index) => {
            i++;
            if (valeur !== tabPanier[index + 1]) {
                paniertmp.push([valeur, i]);
                i = 0;
            }
        })
    }
    return (
        <View style={stylePanier.backPanier}>
            <ImageBackground resizeMode="cover" source={/assets/img/rain.jpg} width={1000} height={100}>
                <View style={stylePanier.panier}>
                    <Text style={stylePanier.titre}>
                        Votre Panier
                    </Text>
                    {
                        /* je boucle sur le tabPanier qui contient les id de mes articles achetés*/
                        boutiqueContext.tabPanier.length > 0 ?
                            paniertmp.map((valeur, index) => {
                                let name = boutiqueContext.articles[valeur[0]].name;
                                let priceu = boutiqueContext.articles[valeur[0]].price;
                                let pricet = boutiqueContext.articles[valeur[0]].price * valeur[1];
                                let qtea = valeur[1];
                                let url = boutiqueContext.articles[valeur[0]].url;
                                // sur le modèle  de mon Bouton.js je "surveille" la qte disponible pour rendre mon bouton + actif ou inactif
                                let isActiveplus = boutiqueContext.articles[valeur[0]].qte === 0 ? true : false
                                return (
                                    <View key={index} style={stylePanier.mesarticles}>
                                        <Image style={stylePanier.panimg} source={url}></Image>
                                        <Text style={stylePanier.sousTxt}>{name}</Text>
                                        <Text style={stylePanier.sousTxt}>{priceu}€/unité</Text>
                                        <View>
                                            <Button style={stylePanier.panbtn}
                                                disabled={isActiveplus}
                                                onClick={() => {
                                                    /* depuis le onClick sur ce bouton j'appelle la fonction decrementQte liée à mon stateArticles ( et donc mon BoutiqueContexte dans App.js )*/
                                                    boutiqueContext.decrementQte(valeur[0])
                                                }}
                                            >+</Button>
                                            <Text style={stylePanier.quantity}>{qtea}</Text>
                                            <Button style={stylePanier.panbtn}
                                                onClick={() => {
                                                    boutiqueContext.incrementQte(valeur[0])
                                                }}
                                            >-</Button>
                                        </View>
                                        <Text style={stylePanier.somme}>{pricet}€</Text>
                                    </View>
                                )
                            })
                            :
                            <Text>Votre panier est actuellement vide</Text>
                    }
                    {
                        boutiqueContext.tabPanier.length > 0 ?
                            <Text style={stylePanier.tot}>Votre total : {boutiqueContext.totalPanier}€</Text>
                            :
                            ""
                    }
                </View>
            </ImageBackground>
        </View >
    )
}

const stylePanier = StyleSheet.create({
    "backPanier": {
        "display": "flex",
        "position": "fixed",
        "height": "100vh",
        "width": "100vw",
        "backgroundColor": "none",
        "top": "0",
        "alignItems": "center",
        "justifyContent": "center",
        "fontFamily": "'Josefin Sans', sans-serif",
        "zIndex": -1
    },
    "panier": {
        "display": "flex",
        "flexDirection": "column",
        "overflowY": "scroll",
        "width": "80vw",
        "height": "70vh",
        "paddingTop": "5%",
        "border": "solid rgb(0, 217, 255)",
        "backgroundColor": "rgba(0, 155, 155, 0.575)",
        "textAlign": "center",
        blurRadius: 1,
        "alignItems": "center",
        width: 300
    },
    "panimg": {
        "display": "flex",
        "justifyContent": "center",
        "marginTop": 1.5,
        width: 300,
        resizeMode: "contain"
    },
    "panbtn": {
        "backgroundImage": "linear-gradient(to right, #348F50 0%, #56B4D3 51%, #348F50 100%)",
        "margin": "10px",
        "padding": "15px 35px",
        "textAlign": "center",
        "textTransform": "uppercase",
        "transition": "0.5s",
        "backgroundSize": "200%",
        "color": "white",
        "boxShadow": "0 0 20px #ccf",
        "borderRadius": 10,
        "display": "inline-block"
    },
    "panbtn_hover": {
        "backgroundPosition": "right center",
        "color": "#fff",
        "textDecoration": "none"
    },
    "tot": {
        "margin": "25px 0"
    },
    "mesarticles": {
        "transition": "all .2s ease-in-out",
        "marginTop": "2.5vh",
        "marginBottom": "2.5vh",
        "width": "50vw"
    }
})



export { Panier }