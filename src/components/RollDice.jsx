import React,{ Component } from 'react'
import './RollDice.css'
import Die from './Die'
  
class RollDice extends Component{
  
  // Face numbers passes as default props
  static defaultProps = {
    sides : ['one', 'two', 'three', 
             'four', 'five', 'six']
  }
  constructor(props){
    super(props)
      
    // States
    this.state = {
      die1 : 'one',
      die2 : 'one',
      rolling: false
    }
    this.roll = this.roll.bind(this)
  }
  roll() {
    const { sides, updateDiceResult } = this.props;
    const result1 = sides[Math.floor(Math.random() * sides.length)];
    const result2 = sides[Math.floor(Math.random() * sides.length)];
    this.setState(
      {
        die1: result1,
        die2: result2,
        rolling: true
      },
      () => {
        setTimeout(() => {
          this.setState({ rolling: false });
          updateDiceResult(result1, result2); 
        }, 1000);
      }
    );
  }
  
  render(){
    const handleBtn = this.state.rolling ? 
                      'RollDice-rolling' : ''
    const {die1, die2, rolling} = this.state
    return(
      <div className='RollDice'>
        <div className='RollDice-container'>
          <Die face={die1} rolling={rolling}/>
          <button className={handleBtn}
                disabled={this.state.rolling} 
                onClick={this.roll}>
          {this.state.rolling ? '...' : '▶'}
        </button>
          <Die face={die2} rolling={rolling}/>
        </div>
      </div>
    )
  }
}
  
export default RollDice