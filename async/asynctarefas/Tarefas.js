import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListatarefasAsyncStorage() {

    const [tarefas, settarefas] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [editando, setEditando] = useState(false)
    const [tarefasendoEditado, settarefasendoEditado] = useState(null)


    useEffect(() => {
        loadtarefas()
    },[])


    async function loadtarefas() {
        const response =  await AsyncStorage.getItem('tarefas')
        console.log("🚀 ~ file: Listatarefas.js:21 ~ loadtarefas ~ response:", response)
        const tarefasStorage = response ? JSON.parse(response) : []
        settarefas(tarefasStorage)
    }


    async function adicionarTarefas() {
        console.log('ADICIONAR Tarefas')
        let novaListatarefas = tarefas
        novaListatarefas.push(inputValue)
        await AsyncStorage.setItem('tarefas', JSON.stringify(novaListatarefas));
        settarefas(novaListatarefas)
        settarefasendoEditado(null)
        setInputValue('')
    }

    async function editarTarefas() {
        console.log('EDITAR Tarefas')
        console.log('tarefasendoEditado: ', tarefasendoEditado)
        console.log('TarefasASerEditado inputValue: ', inputValue)

        let index = tarefas.indexOf(tarefasendoEditado)
        let novaListatarefas = tarefas

        novaListatarefas.splice(index, 1, inputValue)

        await AsyncStorage.setItem('tarefas', JSON.stringify(novaListatarefas));
        settarefas(novaListatarefas)
        setEditando(false)
        setInputValue('')
    }

    async function excluirTarefas(Tarefas) {
        let novaListatarefas = tarefas.filter(item => item !== Tarefas)
        await AsyncStorage.setItem('tarefas', JSON.stringify(novaListatarefas));
        settarefas(novaListatarefas)
    }

    function handleEditarTarefas(tarefas) {
        settarefasendoEditado(tarefas)
        setInputValue(tarefas)
        setEditando(true)
    }

    function handleButton() {
        console.log('HANDLE BUTTON -> editando: ', editando)
        if (editando) {
            editarTarefas()
        } else {
            adicionarTarefas()
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Tarefas'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />


                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={handleButton}
                >
                    {editando ? 'Edit' : 'Add'}
                </Button>

            </View>



            <FlatList
                style={styles.list}
                data={tarefas}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => {
                                handleEditarTarefas(item)
                            }} />
                            <IconButton icon='trash-can-outline' onPress={() => {
                                excluirTarefas(item)
                            }} />
                        </Card.Content>
                    </Card>
                )}

            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingTop: 10,
        gap: 5
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: '95%',
        marginTop: 10
    },
    card: {
        margin: 5
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})