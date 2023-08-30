import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/';

const NavMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View
        style={stylesCss.backgroundMenu}>
        <FontAwesomeIcon icon={faBars}/>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => { }} title="Panier" />
          <Menu.Item onPress={() => { }} title="Contact" />
          <Divider />
          <Menu.Item onPress={() => { }} title="???" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

const stylesCss = StyleSheet.create({
  backgroundMenu: {
    backgroundColor: "#ccf",
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
    zIndex:20
  }
})

export default NavMenu;