import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () =>{
    //Buscar os itens salvos 
    const getItem = async (Key) =>{
        try{
            const passwords = await AsyncStorage.getItem(Key);
            return JSON.parse(passwords) || [];
        }catch(err){
            console.log("Erro ao buscar", err)
            return [];
        }
    }

    // Salvar um item no storage
    const saveItem = async (Key, value) =>{
        try{
            let passwords = await getItem(Key);
            passwords.push(value)
            await AsyncStorage.setItem(Key, JSON.stringify(passwords))
        }catch(err){
            console.log("ERRO AO SALVAR", err)
        }
    }

    // Remover algo do storage
    const removeItem = async (Key, item) =>{
        try{
            let passwords = await getItem(Key);
            let myPasswords = passwords.filter((password) => {
                return(password !== item)
            })

            await AsyncStorage.setItem(Key, JSON.stringify(myPasswords))
            return myPasswords;
        }catch(err){
            console.log("ERRO AO DELETAR", err)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage;