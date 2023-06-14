import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './component/Home/Home';
import Footer from './component/Footer/Footer';
import SignIn from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';
import { auth, db } from './component/config/config';
import {useEffect, useState} from 'react';
import AddProducts from './component/addProducts/addProducts';
import AboutUs from './component/AboutUs/AboutUs';
import AllProducts from './component/AllProducts/AllProducts';
import AllShirtProducts from './component/AllProducts/AllShirtProducts';
import AllPantsProducts from './component/AllProducts/AllPantsProducts';
import AllMaleProducts from './component/AllProducts/AllMaleProducts';
import AllFemaleProducts from './component/AllProducts/AllFemaleProducts';
import AllDressProducts from './component/AllProducts/AllDressProducts';
import AllSkirtProducts from './component/AllProducts/AllSkirtProducts';
import MaleShirt from './component/AllProducts/MaleShirt';
import MalePants from './component/AllProducts/MalePants';
import ProductDetail from './component/ProductDetail/ProductDetail';
import Cart from './component/Cart/Cart';
import AllPriceLowThan500 from './component/AllProducts/AllPriceLowThan500';
import AllPriceFrom500To1M from './component/AllProducts/AllPriceFrom500To1M';
import AllPriceLowThan1M from './component/AllProducts/AllPriceLowThan1M';

function App() {
  const [names, setNames] = useState(null)
  console.log(names)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        db.collection('SignUp').doc(user.uid).get().then(snapshot => {
          setNames(snapshot.data().Name)
        })
      } else {
        setNames(null)
      }
    })
  }, [names])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={() => <Home user={names}/>} />
          <Route exact path='/SignIn' component={SignIn} />
          <Route exact path='/SignUp' component={SignUp} />
          <Route exact path='/AddOutlet' component={() => <AddProducts user={names} />} />
          <Route exact path='/AboutUs' component={() => <AboutUs user={names} />} />
          <Route exact path='/AllProducts' component={() => <AllProducts user={names} />} />
          <Route exact path='/AllShirtProducts' component={() => <AllShirtProducts user={names} />} />
          <Route exact path='/AllPantsProducts' component={() => <AllPantsProducts user={names} />} />
          <Route exact path='/AllMaleProducts' component={() => <AllMaleProducts user={names} />} />
          <Route exact path='/AllFemaleProducts' component={() => <AllFemaleProducts user={names} />} />
          <Route exact path='/AllDressProducts' component={() => <AllDressProducts user={names}/>} />
          <Route exact path='/AllSkirtProducts' component={() => <AllSkirtProducts user={names}/>} />
          <Route exact path='/AllPriceLowThan500' component={() => <AllPriceLowThan500 user={names}/>} />
          <Route exact path='/AllPriceFrom500To1M' component={() => <AllPriceFrom500To1M user={names}/>} />
          <Route exact path='/AllPriceLowThan1M' component={() => <AllPriceLowThan1M user={names}/>} />
          <Route exact path='/MaleShirt' component={() => <MaleShirt user={names}/>} />
          <Route exact path='/MalePants' component={() => <MalePants user={names}/>} />
          <Route exact path='/ProductDetail/:ProductID' component={() => <ProductDetail user={names}/>} />
          <Route exact path='/Cart' component={() => <Cart user={names} />} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
