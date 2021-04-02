import React,{useState,useEffect} from 'react';

const url = 'https://api.imgflip.com/get_memes'
const MemeGenerator=()=>{
   const [count, setCount] = useState(0);
   const[topText,setTopText]=useState('');
   const[bottomText,setBottomText]=useState('');
   const[randomImg,setRandomImg]=useState('http://i.imgflip.com/1bij.jpg');
   const[allimgs,setAllImgs]=useState([]);
 
   const fetchMemes=async()=>{
         try{
             const response=await fetch(url);
             const memesa=await response.json();
             const {memes}=memesa.data;
             if(memes){
                 const newMemes=memes.map((item)=>{
                 const{id,name,url}=item;
                  return{id:id,name:name,url:url}
                })
             setAllImgs(newMemes);
            }

            }catch (error){
            }
            };

   useEffect(()=>{
     fetchMemes();
    },[count]);
   
    if(count < 1) {
       setTimeout(() => {
        setCount(count + 1);
       }, 1000);
    }


   const handleClick=()=>{
     const randNum = Math.floor(Math.random() * allimgs.length);
     var num=allimgs[randNum];
     const {url}=num
    setRandomImg(url)
    };

  return (
    <div className="container-fluid">
      <div className="row memeapp">
        <div className="col-sm-3">
          <form>
           <input
               type="text"
               name="topText"
               placeholder="top text"
               value={topText}
               onChange={e=>setTopText(e.target.value)}
            /><br/>
          <input
               type="text"
               name="bottomText"
               placeholder="bottom text"
               value={bottomText}
               onChange={e=>setBottomText(e.target.value)}
          />
          </form>        
          <button onClick={()=>handleClick()} className="btn btn-secondary">Generate</button>
        </div>
        <div className="col-sm-8">
        <div className="meme">
          <img src={randomImg} alt="" />
          <h2 className="top">{topText}</h2>
          <h2 className="bottom">{bottomText}</h2>
        </div>
        </div>
      </div>
    </div>
    )
  }
export default MemeGenerator
