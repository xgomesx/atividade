import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function ListaPessoAS({ navigation, route }) {

  const [PessoAS, setPessoAS] = useState([
    {
      NomE: 'João Paulo',
      IdadE: '25',
      AlturA: '189',
      PesO: '80,5'
    },
    {
      NomE: 'Jorge Luiz',
      IdadE: '20',
      AlturA: '180',
      PesO: '70'
    }
  ])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [PessoAASerExcluida, setPessoAASerExcluida] = useState(null)

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);


  function adicionarPessoA(PessoA) {
    let NListaPessoAS = PessoAS
    NListaPessoAS.push(PessoA)
    setPessoAS(NListaPessoAS)
  }

  function editarPessoA(PessoAAntiga, novosDados) {
    console.log('PessoA ANTIGA -> ', PessoAAntiga)
    console.log('DADOS NOVOS -> ', novosDados)

    const NListaPessoAS = PessoAS.map(PessoA => {
      if (PessoA == PessoAAntiga) {
        return novosDados
      } else {
        return PessoA
      }
    })

    setPessoAS(NListaPessoAS)

  }

  function excluirPessoA(PessoA) {
    const novaListaPessoA = PessoAS.filter(p => p !== PessoA)
    setPessoAS(novaListaPessoA)
    Toast.show({
      type: 'success',
      text1: 'PessoA excluida com sucesso!'
    })
  }

  function handleExluirPessoA() {
    excluirPessoA(PessoAASerExcluida)
    setPessoAASerExcluida(null)
    hideModal()
  }

  function getImc(PessoA) {
    const PesO = parseFloat(PessoA.PesO)
    const AlturA = parseFloat(PessoA.AlturA)
    const imc = PesO / ((AlturA / 100) * (AlturA / 100))
    return imc.toFixed(2)
  }


  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Pessoas</Text>

      <FlatList
        style={styles.list}
        data={PessoAS}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.NomE}</Text>
                <Text variant='bodyLarge'>Idade: {item?.IdadE}</Text>
                <Text variant='bodyLarge'>Altura: {item?.AlturA} cm</Text>
                <Text variant='bodyLarge'>Peso: {item.PesO} kg</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>IMC</Text>
                <Text variant='bodyLarge'>{getImc(item)}</Text>
              </View>


            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormPessoA', { acao: editarPessoA, PessoA: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setPessoAASerExcluida(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormPessoA', { acao: adicionarPessoA })}
      />


      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirPessoA}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})