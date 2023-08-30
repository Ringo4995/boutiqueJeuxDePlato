import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
/* import Bouton from '../Bouton/Bouton'; */
import { BoutiqueContext } from '../../BoutiqueContext.js';
import { Avatar, Button, Card, Text } from 'react-native-paper';

function CardArticle(props) {
  const LeftContent = props => <Avatar.Icon {...props} icon="apple" />
  const boutiqueContext = useContext(BoutiqueContext);
  return (
    <Card style={styleCard.toutCard}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{props.article.name}</Text>
        <Text variant="bodyMedium">{props.article.description}</Text>
      </Card.Content>
      <Card.Cover resizeMode='contain' source={props.article.url} />
      <Card.Actions>
        <Text style={rustine.alignement}>Stock : {props.article.qte}</Text>
        <Text style={rustine.alignement}>Prix : {props.article.price} €</Text>
        <Button style={rustine.laFlemme}></Button>
        <Button onPress={() => {
          boutiqueContext.decrementQte(props.article.id)
        }}>Mettre dans le Panier</Button>
      </Card.Actions>
    </Card>
  )
};

const rustine = StyleSheet.create({
  laFlemme: {
    display: "none"
  },
  alignement: {
    position: 'relative',
    marginRight: 25
  }
})

const styleCard = StyleSheet.create({
  toutCard: {
    marginTop: 10,
    position: "relative",
    zIndex: -1
  }
})

export default CardArticle;