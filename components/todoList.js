import React, { useState, useEffect } from "react";
import type { Node } from "react";
import {
  
  View,
  
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  
  Modal,
  
  Pressable,
  TextInput,
  
} from "react-native";
import styled from "styled-components";


import axios from "axios";

export const TodoList: () => Node = () => {
  const [data, setData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [activity, setActivity] = useState(true);
  const [goalContent, setGoalContent] = useState("");
  const [editingMode, setEditingMode] = useState(null);
  const [editingModeValue, setEditingModeValue] = useState("");
  const url = "https://61851c6723a2fe0017fff39d.mockapi.io/todos";

  function creater() {
    setModalVisible(!modalVisible);
  }

  const editData = (id) => {
    const updatedData = [...data].map((info) => {
      if (info.id === id) {
        info.name === editingModeValue;
        axios
          .put(`https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`, {
            name: editingModeValue,
          })
          .then(() => {
            getData();
          });
      }
      return info;
    });
    setData(updatedData);
    setEditingMode(null);
    setEditingModeValue("");
  };

  const getData = async () => {
    const response = await axios.get(url);
    setData(response.data);
    setActivity(false);
  };

  const postData = () => {
    creater();
    const object = {
      name: goalContent,
      done: false,
    };
    axios.post(url, object).then(() => {
      const temp = [...data];
      temp.push(...data, object);
      setData(temp);
    });
  };

  const deleteData = (id) => {
    axios.delete(`https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`);
    const filtered = data.filter((item) => item.id !== id);
    setData(filtered);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  return (
    <Container>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <ModalWindow>
          <ModalContent>
            <ButtonText
              style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}
            >
              Create a goal
            </ButtonText>
            <InputField value={goalContent} onChangeText={setGoalContent} />

            <TouchableOpacity>
              <Pressable onPress={postData}>
                <CreateButton style={{ marginLeft: 115, marginTop: 20 }}>
                  <ButtonText>Create</ButtonText>
                </CreateButton>
              </Pressable>
            </TouchableOpacity>
          </ModalContent>
        </ModalWindow>
      </Modal>
      <Block>
        <Content>
          <View>
            <Title>Goal Creator</Title>
          </View>
          <View>
            <TouchableOpacity>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <CreateButton>
                  <ButtonText>Create</ButtonText>
                </CreateButton>
              </Pressable>
            </TouchableOpacity>
          </View>
        </Content>
      </Block>
      <Block>
        {activity ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => {
              const updateStatus = (id) => {
                axios
                  .put(
                    `https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`,
                    { done: !item.done }
                  )
                  .then(() => {
                    getData();
                  });
              };
              return (
                <Data>
                  {editingMode === item.id ? (
                    <TextInput
                      value={editingModeValue}
                      onChangeText={setEditingModeValue}
                      style={{
                        borderWidth: 1,
                        width: 200,
                        height: 50,
                        backgroundColor: "lightgray",
                      }}
                    />
                  ) : (
                    <Title
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        borderWidth: 1,
                        borderColor: item.done ? "green" : "red",
                      }}
                    >
                      {item.id}) {item.name}
                    </Title>
                  )}

                  <ButtonBlock>
                    <TouchableOpacity>
                        <Pressable onPress={() => updateStatus(item.id)}>
                            <EditButton>
                                <ButtonText>Update</ButtonText>
                            </EditButton>
                        </Pressable>
                    </TouchableOpacity>  
                    {editingMode ? (
                      <TouchableOpacity>
                        <Pressable onPress={() => editData(item.id)}>
                          <EditButton>
                            <ButtonText>Edit</ButtonText>
                          </EditButton>
                        </Pressable>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity>
                        <Pressable onPress={() => setEditingMode(item.id)}>
                          <EditButton>
                            <ButtonText>Edit</ButtonText>
                          </EditButton>
                        </Pressable>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity>
                      <Pressable onPress={() => deleteData(item.id)}>
                        <DeleteButton>
                          <ButtonText>Delete</ButtonText>
                        </DeleteButton>
                      </Pressable>
                    </TouchableOpacity>
                  </ButtonBlock>
                </Data>
              );
            }}
          />
        )}
      </Block>
    </Container>
  );
};

const Container = styled.View`
  flex: 1
  border-width: 5px

  justify-content: space-around
`;
const Block = styled.View`
  min-height: 75px
`;

const Content = styled.View`
  flex: 1
  align-items: center
  justify-content: space-between
  padding: 15px

  flex-direction: row
`;
const Title = styled.Text`
  font-size: 16px
  font-weight: bold
  max-width: 200px
`;

const Icon = styled.Image`
  height: 25px
  width: 25px
  
`;

const EditButton = styled.View`
background-color: lightgray
align-items: center
justify-content: center
border-radius: 10px
height: 30px
width: 60px
margin-right: 15px
`;
const CreateButton = styled.View`
background-color: darkblue
align-items: center
justify-content: center
border-radius: 10px
height: 50px
width: 120px
margin-right: 10px
`;
const DeleteButton = styled.View`
background-color: red
align-items: center
justify-content: center
border-radius: 10px
height: 30px
width: 60px
margin-right: 10px
`;

const Data = styled.View`
  flex: 1
  align-items: center
  flex-direction: row
  margin-top: 6px
  
  
`;

const ButtonText = styled.Text`
  color: whitesmoke
`;

const ButtonBlock = styled.View`
  flex: 1
  flex-direction: row
  justify-content: flex-end
  float: right
`;

const ModalWindow = styled.View`
  flex: 1
  justify-content: center
  align-items: center
`;
const ModalContent = styled.View`
    
    height: 200px
    width: 300px
    background-color: turquoise
    border-radius: 10px
    
`;
const InputField = styled.TextInput`
  background-color: white
  margin-top: 30px
  margin-left: 10px
  width: 90%
  border-radius: 10px
        
`;
