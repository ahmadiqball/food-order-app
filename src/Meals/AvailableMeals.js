import React, { useState, useEffect } from 'react';
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem";




const AvailableMeals = () => {
  const [mealDatas, setMealDatas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(false)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://reactmeals-debe8-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      setMealDatas(loadedMeals)
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(true)
    });
    
  }, [])

  let mealsContent;

  if (httpError) {
    mealsContent = <h3 className={classes.mealsError}>Sorry, Something went wrong!</h3>
  } else if (!isLoading) {
    mealsContent = <ul>
    {mealDatas.map((meal) => (
      <MealsItem
        name={meal.name}
        desc={meal.description}
        price={meal.price}
        key={meal.id}
        id={meal.id}
      />
    ))}
  </ul>
  } else {
    mealsContent = <h3 className={classes.mealsLoad}>Loading...</h3>  
  }

  return (
    <div className={classes.meals}>
      <Card>
        {mealsContent}
      </Card>
    </div>
  );
};

export default AvailableMeals;
