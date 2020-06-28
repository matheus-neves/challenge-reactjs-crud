import React, { useState, useEffect } from 'react';

import { Transition } from 'react-transition-group';
import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [delayAnimation, setDelayAnimation] = useState(true);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    if (delayAnimation) {
      setDelayAnimation(false);
    }

    try {
      const formatedData = {
        ...food,
        available: true,
      };

      const response = await api.post<IFoodPlate>('/foods', formatedData);

      const { data } = response;

      setFoods([...foods, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const { id, available } = editingFood;

      const formatedFood = {
        ...food,
        available,
      };

      const response = await api.put<IFoodPlate>(`/foods/${id}`, formatedFood);

      const copyOfFoods = [...foods];

      const data = copyOfFoods.map(foodItem =>
        foodItem.id === id ? response.data : foodItem,
      );

      setFoods(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const copyOfFoods = [...foods];

    const data = copyOfFoods.filter(food => food.id !== id);

    setFoods(data);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    if (food.id) {
      setEditingFood(food);
      toggleEditModal();
    }
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map((food, index) => (
          <Transition in timeout={600} key={food.id}>
            {state => (
              <Food
                food={food}
                state={state}
                index={index}
                delayAnimation={delayAnimation}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            )}
          </Transition>
        ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
