import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormPessoa({ navigation, route }) {

    const { Acao, PessoaAntiga: pessoaAntiga } = route.params

    const [NomE, setNomE] = useState('')
    const [IdadE, setIdadE] = useState('')
    const [PesO, setPesO] = useState('')
    const [AlturA, setAlturA] = useState('')

    const [MostrarMensagemErro, setMostrarMensagemErro] = useState(false)

    useEffect(() => {
        if (pessoaAntiga) {
            setNomE(pessoaAntiga.NomE)
            setIdadE(pessoaAntiga.IdadE)
            setPesO(pessoaAntiga.PesO)
            setAlturA(pessoaAntiga.AlturA)
        }
    }, [])

    function Salvar() {
        if (NomE === '' || IdadE === '' || PesO === '' || AlturA === '') {
            setMostrarMensagemErro(true)
        } else {
            setMostrarMensagemErro(false)

            const NovaPessoa = {
                NomE: NomE,
                IdadE: IdadE,
                PesO: PesO,
                AlturA: AlturA
            }

            if (pessoaAntiga) {
                Acao(pessoaAntiga, NovaPessoa)
            } else {
                Acao(NovaPessoa)
            }

            Toast.show({
                type: 'success',
                text1: 'Pessoa salva com sucesso!'
            })

            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Text variant='titleLarge' style={styles.title}>{pessoaAntiga ? 'Editar Pessoa' : 'Adicionar Pessoa'}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'NomE'}
                    mode='outlined'
                    value={NomE}
                    onChangeText={text => setNomE(text)}
                    onFocus={() => setMostrarMensagemErro(false)}
                />
                <TextInput
                    style={styles.input}
                    label={'IdadE'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={IdadE}
                    onChangeText={text => setIdadE(text)}
                    onFocus={() => setMostrarMensagemErro(false)}
                />
                <TextInput
                    style={styles.input}
                    label={'PesO | KG'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={PesO}
                    onChangeText={text => setPesO(text)}
                    onFocus={() => setMostrarMensagemErro(false)}
                />
                <TextInput
                    style={styles.input}
                    label={'AlturA | cm'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={AlturA}
                    onChangeText={text => setAlturA(text)}
                    onFocus={() => setMostrarMensagemErro(false)}
                />
                {MostrarMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>todos os campos!</Text>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>
                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={Salvar}
                >
                    Salvar
                </Button>
            </View>
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
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})
formpessoas