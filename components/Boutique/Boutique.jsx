import { StyleSheet, View } from "react-native";
import CardArticle from "../Card/Card";

const styles = StyleSheet.create({
    boutique: {
        display: 'flex',
    }
})

function Boutique(props) {

    return (
        <View style={styles.boutique}>
            {
                props.articles.map((value, index) => {
                    return (
                        <CardArticle
                            article={value}
                            key={index}
                        ></CardArticle>
                    )
                })
            }
        </View>
    )
}

export default Boutique;