import React, { useState, useEffect } from "react";
import "./App.css";
import {Chart as ChartJS ,BarElement ,CategoryScale ,LinearScale ,Tooltip ,Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement , CategoryScale, LinearScale, Tooltip, Legend
)


const SearchBar = () => {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  useEffect(() => {
    const total = container.reduce((acc, item) => {
      return acc + item.calories;
    }, 0);
    setTotalCalories(total);
  }, [container]);

  const data = {
    labels:['Calories', 'Fat', 'Sugar', 'Carbohydrates', 'Cholesterol'],
    datasets: [
      {
        label: 'Nutrition Information',
        data: [
          totalCalories,
            container.reduce((acc,item) => acc + item.fat_total_g, 0),
            container.reduce((acc,item) => acc + item.sugar_g, 0),
            container.reduce((acc,item) => acc + item.carbohydrates_total_g, 0),
            container.reduce((acc,item) => acc + item.cholesterol_mg, 0),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 3
      }
    ]
  }
  const options= {

  }

  const fetchMe = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8f743bded5msh1945bec7e7f889cp1b4436jsn6da9a91e32b1",
        "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(
      `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=+${endPoint}`,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContainer(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };

  return (
    <div className="search-container">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={endPoint}
          onChange={onChangeHandler}
          style={{ width: "400px", height: "50px" }}
        />
        <button type="submit">
          <b>Submit</b>
        </button>
      </form>
      <div className="total-calories">
        <p>
          <b>Total Calories : </b> {totalCalories}
        </p>
      </div>
      <div className="container1">
        {container.map((item, index) => {
          return (
            <div className="item" key={index}>
              <p>
                <b>Food:</b>
                {item.name}
              </p>
              <p>
                <b>Calories:</b>
                {item.calories}
              </p>
              <p>
                <b>Fat:</b>
                {item.fat_total_g}
              </p>
              <p>
                <b>Sugar:</b>
                {item.sugar_g}
              </p>
              <p>
                <b>Carbohydrates:</b>
                {item.carbohydrates_total_g}
              </p>
              <p>
                <b>Cholesterol:</b>
                {item.cholesterol_mg}
              </p>
            </div>
          );
        })}
      </div>
      <div 
      style = {
        {
          padding:'20px',
          width:'800',
        }
      }>
        <Bar 
        data = { data }>
        options = { options }  

        </Bar>
      </div>
    </div>
  );
};

export default SearchBar;