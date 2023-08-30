/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import articles from './articles.js';
import { MenuContext } from './MenuContext.js';
import { BoutiqueContext } from './BoutiqueContext.js';
import NavMenu from './components/Menu/NavMenu.js';
import Boutique from './components/Boutique/Boutique.jsx';
import { Panier } from './components/Panier/Panier.jsx';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {

  const [stateMenu, setStateMenu] = useState(
    {
      "displayPanier": false,
      "displayUl": false,
      "tabMenuNav": [
        {
          text: "Magasin",
          url: "#",
          isActive: false
        },
        {
          text: "Panier",
          url: "#",
          isActive: false
        },
        {
          text: "Contact",
          url: "#",
          isActive: false
        }
      ],
      "burgerButton": burgerButton,
      "fonctDisplayPanier": fonctDisplayPanier
    }
  )
  const [stateArticles, setStateArticles] = useState(
    {
      "articles": articles,
      "tabPanier": [],
      "totalPanier": 0,
      "decrementQte": decrementQte,
      "incrementQte": incrementQte
    }
  );
  function burgerButton(disp: Number) {
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    })
  }
  function fonctDisplayPanier(disp: Number) {
    setStateMenu({
      ...stateMenu,
      "displayPanier": !disp
    })
  }
  function decrementQte(id: Number) {
    //je fais une copie de mon tableau stateArticles car il est en lecture seule et je ne peux pas le modifier directement
    let articlesTmp = stateArticles.articles;
    //je modifie la qte de l'article correspondant à l'id transmis par mon component Bouton
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        valeur.qte > 0 && --valeur.qte;
        /* if(valeur.qte === 0){
          valeur.qte = 0;
        } else{
          valeur.qte -=1;
        } */
      }
    })
    // j'ajoute l'id de l'article acheté au tableau stateArticles.tabPanier
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)
    // je réassigne le nouveau tableau artcle modifié à mon stateArticles grace à sa fonction setStateArticles
    setStateArticles(
      {
        ...stateArticles,
        // ... rappelle toutes les propriétés de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    // console.dir(stateArticles.tabPanier);
    calculTotal()
  }
  function incrementQte(id: Number) {
    let supprIndex: Number;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {
        //je récupère dans mon tableau stateArticles.tabPanier l'index de l'article à supprimer
        supprIndex = index;
      }
    })
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);

    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        ++valeur.qte;
      }
    })
    // une fois toutes les modifications effectuées sur mes tableaux tempiraires je peux les affecter à mes states

    setStateArticles(
      {
        ...stateArticles,
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    calculTotal()
  }
  function calculTotal() {
    let totalTmp = 0;
    stateArticles.tabPanier.map((valeur) => {
      totalTmp += stateArticles.articles[valeur].price;
    })
    setStateArticles(
      {
        ...stateArticles,
        "totalPanier": totalTmp
      }
    )
  }

  return (
    <MenuContext.Provider value={stateMenu}>
      <BoutiqueContext.Provider value={stateArticles}>
        <SafeAreaView>
          <StatusBar />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View>
              <NavMenu></NavMenu>
            </View>
            <View>
              <Panier></Panier>
              <Boutique articles={stateArticles.articles}></Boutique>
            </View>
          </ScrollView>
        </SafeAreaView></BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
