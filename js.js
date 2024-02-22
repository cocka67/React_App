// function useConsoleLog() {
//     let text = '';
//     const setText = function(newText) {
//       text = newText;
//     }
//       const toConsole = function() {
//           console.log(`Твой текст: ${text}`)
//       }
//       return {setText, toConsole}
//   }
  
//   function Component = (props) => {
//       const {setText, toConsole} = useConsoleLog();
      
//       const handleClick = () => {
//           setText('Привет, мир!');
//           toConsole();
//       }
//       // Создаём обработчик, который получает сообщение извне аргументом
//       const handleClick2 = (message) => {
//           setText(message);
//           toConsole();
//       }
  
//       return (
//           <><button onClick={handleClick}>В консоль</button>
//               // Для вызова с аргументом обернём handleClick2 в стрелочную функцию
//               <button onClick={() => handleClick2("клик-клик")}>Клик в консоль</button></>
//       )
//   }

  'use client';
// Импортируем хук из библиотеки React
import { useRef } from 'react';

function Counter() {
    // Создаём объект с изначальным значением, равным - {current: 0}
  let ref = useRef(0);

    const handleClick = () => {
        // Увеличиваем значение на один
    ref.current = ref.current + 1;
    alert('На кнопку кликнули ' + ref.current + ' раз!');
  }

  return (
    <button onClick={handleClick}>
      Кликни на меня!
    </button>
  );
}


'use client';
// Импортируем из библиотеки React
import {useRef} from 'react';

const Input = () => {
    // Записываем объект, возвращаемый хуком, в переменную
    const myInput = useRef(null);
    const handleInput = () => {
        // Вызвав myInput.current.value, можно получить текущее значение элемента ввода
        console.log(myInput.current.value);
    }
    // Присваиваем в атрибут ref объект myInput для доступа к DOM-элементу
    return <input type="text" ref={myInput} onInput={handleInput}/>
};


// Компонент PopUp получает функцию для закрытия извне через props
const PopUp = (props) => {
    return (
        <div className="popup">
            <p>текст</p>
            // Получаем из параметров props-обработчик, закрывающий PopUp
            <button onClick={()=>{props.closePopUp}}>Закрыть</button>
        </div>
    )
}

// В компоненте Page, в котором располагается PopUp, существует состояние, 
// отвечающее за отрисовку PopUp 
const Page = () => {
    // Состояние isPopUpOpened хранится в boolean-типе
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    
    // Обработчик, который закрывает PopUp, необходимо также передать через props
    // дочернему компоненту PopUp
    const handlePopUp = () => {
        setIsPopUpOpened(!isPopUpOpened);
    }

    return (
        <div>
            // Если isPopUpOpened равен true, отобразится компонент PopUp
            {isPopUpOpened && <PopUp closePopup={handlePopUp}/>}
            <button onClick={handlePopUp}>Открыть попап</button>
        </div>
    )
}