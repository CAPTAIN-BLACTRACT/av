import { Component, signal } from '@angular/core';
import { CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface Bar{
  value: number,
  state: 'default' | 'swap' | 'compare' | 'sorted';
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  arraySize= signal(30);
  speed=signal(50);
  isSorting= signal(false);

  async bubbleSort(){
    this.isSorting.set(true);
    const arr = this.bars();
    const n= arr.length;

    for(let i=0; i<n-1; i++){
      for(let j=0;j<n-1-i;j++){
        arr[j].state = 'compare';
        arr[j+1].state = 'compare';

        this.bars.set([...arr]);

        await this.delay(this.speed());

        if(arr[j].value > arr[j+1].value){
          arr[j].state = 'swap';
          arr[j+1].state = 'swap';

          this.bars.set([...arr]);
          await this.delay(this.speed());

          let temp = arr[j].value;
          arr[j].value = arr[j+1].value;
          arr[j+1].value = temp;
          this.bars.set([...arr]);
        }

        arr[j].state = 'default';
        arr[j+1].state = 'default';

      }

      arr[n-1-i].state = 'sorted';
      this.bars.set([...arr]);

    }
    arr[0].state= 'sorted';
    this.bars.set([...arr]);

    this.isSorting.set(false);
  }


  async selectionSort(){
    this.isSorting.set(true);
    const arr = this.bars();

    const n = arr.length;

    for(let i=0; i<n; i++){
      let minInx =  i;

      arr[i].state = 'compare';
      this.bars.set([...arr]);

      for(let j=i+1;j<n;j++){
        arr[j].state='compare';
        this.bars.set([...arr]);

        await this.delay(this.speed());

        if(arr[j].value < arr[minInx].value){
          if(minInx !== i){
            arr[minInx].state = 'default';
          }
          minInx = j;
          arr[minInx].state='swap';
        }else{
          arr[j].state='default'
        }

        this.bars.set([...arr]);
      }

      if(minInx !== i){
        let temp = arr[i].value;
        arr[i].value = arr[minInx].value;
        arr[minInx].value = temp;

        arr[minInx].state= 'default';
      }

      arr[i].state= 'sorted';
      this.bars.set([...arr]);
      await this.delay(this.speed());
    }

    this.isSorting.set(false);
  }

  bars=signal<Bar[]>([]);

  constructor(){
    this.resetArray();
  }

  resetArray(){
    if(this.isSorting()) return;

    const newBars: Bar[] = [];

    for( let i=0;i<this.arraySize(); i++){
      newBars.push({
      value:Math.floor(Math.random()*90)+10,
        state: 'default'
      });

    }

    this.bars.set(newBars);
  }

  delay(ms: number){
    return new Promise(resolve=> setTimeout(resolve,ms));
  }
}
