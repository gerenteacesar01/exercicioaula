import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View, Text, Button, SafeAreaView, ActivityIndicator, TextInput, ScrollView } from "react-native";
import { Keyboard } from 'react-native';
import axios from "axios";

export default ApiContainer = () => {
  const [loading, setLoading] = useState(false)
  const [fromAxios, setFromAxios] = useState(false);
  const [operacao, setOperacao] = useState(false);
  const [produtos, setProdutos] = useState(null);

  const lista= [];

  const setLista = (json) => {
    json.forEach((element) => {
      lista.push(element.nome)
    });
    setProdutos(lista);
    setFromAxios(true);
  }

  const goAPIProdutos = () => {
    setFromAxios(false);
    setLoading(true);

    axios.get("http://10.136.63.185:3000/produtos")
      .then(response => {
        setTimeout(() => {
          setLoading(false);
          setLista(response.data);
          setFromAxios(true);
          Keyboard.dismiss();
          setOperacao(false);
        }, 2000)
      })
      .catch(error => {
        console.log(error);
      });
  }



  const separadorItem = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };

  const mensagemVazia = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>Nenhum registro
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ top: 30 }}>
      <View style={{ margin: 18 }}>
        <Button
          title={'Liste os produtos'}
          onPress={() => { goAPIProdutos() }}
          color='green'
        />
      </View>

      {
        operacao?
        <View style={{ margin: 18 }}>
          {empty ? mensagemVazia(empty) :
            <FlatList
              data={items}
              ItemSeparatorComponent={separadorItem}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View key={item.indice} style={styles.container}>
                  <Text style={styles.itemsStyle}> {item.indice} {item.cep}</Text>
                </View>
              }
            />
          }
        </View>
      : ""
        }

      {fromAxios ?
        <View>
          {produtos.map((produto) => (
                <Text style={{ margin: 18 }}>Nome do produto: {produto}</Text>
            ))}
          
        </View>
        :
        <Text style={{ margin: 18 }}></Text>
      }
      {loading &&
        <View>
          <Text style={{ fontSize: 16, color: 'red', margin: 18 }}>Carregando...</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
});