import React, { Component } from 'react';
import { Text, Button, View, StyleSheet, TouchableHighlight, Image, ScrollView, AsyncStorage } from "react-native";
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles, { Variables } from "../styles";
import ScreenHeader from "../components/ScreenHeader";

const MenuItem = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress} style={styles.menuItemContainer} underlayColor={Variables.colors.gray}>
            <View style={styles.menuItemInner}>
                <View style={styles.menuItemIconContainer}>
                    <Image source={props.icon} style={styles.menuItemIcon} />
                </View>

                <View style={styles.menuItemContent}>
                    <Text style={[Styles.h1, styles.menuItemContentTitle]}>{props.title}</Text>
                    <Text style={styles.menuItemContentSubtitle}>{props.subtitle}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default class HomeScreen extends Component {
    constructor(props) {
    super(props);

        this.state = {
            loading: false,
            plano: 1,
            planoBD: true,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        
        await this.carregarPlano();

        this.setState({ loading: false });
    }

    async carregarPlano() {
        var plano = await AsyncStorage.getItem("plano");
        var planoBD = plano === "1";

        await this.setState({ 
            plano, 
            planoBD
        });
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View>
                <Spinner visible={this.state.loading} />

                <ScreenHeader titulo={"Faceb"} />

                <ScrollView contentContainerStyle={Styles.scrollContainer}>
                    <MenuItem title={"Dados Pessoais"} subtitle={"Confira seus dados cadastrais"} icon={require("../assets/ic_dados.png")} onPress={this.navigateToScreen("Dados")} />
                    <MenuItem title={"Sua Contribuição"} subtitle={"Visualize e entenda sua contribuição"} icon={require("../assets/ic_contribuicao.png")} onPress={this.navigateToScreen("Contribuicao")} />

                    {this.state.planoBD && 
                        <MenuItem title={"Seu Saldo"} subtitle={"Visualize seu saldo"} icon={require("../assets/ic_saldo.png")} onPress={this.navigateToScreen("SaldoBD")} />}

                    {!this.state.planoBD && 
                        <MenuItem title={"Seu Saldo"} subtitle={"Visualize seu saldo"} icon={require("../assets/ic_saldo.png")} onPress={this.navigateToScreen("SaldoCD")} />}

                    <MenuItem title={"Contracheque"} subtitle={"Consulte aqui seus contracheques"} icon={require("../assets/ic_contracheque.png")} onPress={this.navigateToScreen("Contracheque")} />
                    <MenuItem title={"Sua Aposentadoria"} subtitle={"Simule aqui sua aposentadoria futura"} icon={require("../assets/ic_sim_beneficio.png")} />
                    <MenuItem title={"Relacionamento"} subtitle={"Envie aqui suas mensagens com suas duvidas"} icon={require("../assets/ic_chat.png")} />
                    <MenuItem title={"Selecionar Plano"} subtitle={"Escolha outro plano"} icon={require("../assets/ic_plano.png")} />
                    <MenuItem title={"Sair"} subtitle={"Sair do aplicativo"} icon={require("../assets/ic_out.png")} />
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    menuItemContainer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        marginBottom: 10
    },
    menuItemInner: {
        flexDirection: 'row'
    },
    menuItemIconContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    menuItemIcon: {
        marginLeft: 10,
        marginRight: 20,
        width: 26,
        height: 26
    },
    menuItemContent: {
        flex: 1
    },
    menuItemContentTitle: {
        flex: 1
    },
    menuItemContentSubtitle: {
        flex: 2
    }
});