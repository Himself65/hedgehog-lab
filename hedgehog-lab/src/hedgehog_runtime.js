import React from 'react';
import _Mat from './lib/matrix'
import _MathLib from './lib/mathlib'
import {Chol as _Chol } from './lib/algebra'
import OutputItem from './output/output_item'
/*

This is the core runtime for compiled hedgehog script,
all the built-in functions will be defined in this file
to make sure that user can call it from hedgehog script.

*/

class Mat extends _Mat.Mat {};

// below is a wrapper of constructing a Mat object
function mat(input?: number[][] | number[]| number): Mat {return new Mat(input);}

//below are some functions that convert Matrix into other format and vice versa


//CSV to Matrix
function csv2mat(strCSV: string): Mat { return _Mat.csv2mat(strCSV);}
function mat2csv(A:Mat):string {return _Mat.mat2csv(A);}


//Json to Matrix
function json2mat(json_str: string): Mat { return _Mat.json2mat(json_str);}
function mat2json(A:Mat):string {return _Mat.mat2json(A);}


//Math Lib functions
function sin(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.sin(A);}
function cos(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.cos(A);}
function abs(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.abs(A);}
function acos(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.acos(A);}
function acosh(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.acosh(A);}
function sign(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.sign(A);}
function sqrt(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.sqrt(A);}
function trunc(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.trunc(A);}
function floor(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.floor(A);}
function ceil(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.ceil(A);}
function exp(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.exp(A);}
function log(A:Mat|number[][]|number[]|number, base?:number):Mat{ return _MathLib.log(A, base);}
function asin(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.asin(A);}
function asinh(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.asinh(A);}
function atan(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.atan(A);}
function atanh(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.atanh(A);}
function tan(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.tan(A);}
function tanh(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.tanh(A);}
function pow(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.pow(A);}
function round(A:Mat|number[][]|number[]|number):Mat{ return _MathLib.round(A);}

//matrix constructors
function Ns(row:Number, col:number, N:number):Mat {return mat().Ns(N);}
function ones(row:number, col:?number):Mat {return mat().ones(row,col);}
function zeros(row:number, col?:number):Mat {return mat().zeros(row,col);}
function diag(input_array: number[]): Mat{return mat().diag(input_array);}
function eye(row:number, col?:number): Mat{ return mat().eye(row, col);}
function random(row: number, col?: number):Mat {return mat().random(row, col);}
function range(start:number, end = null, step = 1):Mat {return mat().range(start, end,step);}

//linear algebra
class Chol extends _Chol {}
function chol(A:Mat): Chol {return new Chol(A);}

//tic and toc
let timestamp = 0;
function tic() {timestamp = performance.now()}
function toc() {print(`Elapsed time: ${performance.now() - timestamp} milliseconds.`);}

//below is the execution part 

// _GLOBAL_RESULTS_ is a list of strings from user output
var _GLOBAL_RESULTS_ = [];

var _OUTPUT_ITEMS_LIST_ = [];

// print function is a function for user to output information
function print(a:any) { 
    _GLOBAL_RESULTS_.push(a); 
    let objItem = new OutputItem();
    objItem.outputType = "print";
    objItem.text = a;
    _OUTPUT_ITEMS_LIST_.push(objItem);
}


//draw function is a function for user to draw figures using plotly.js
function draw(data:any, layout:any)
{
    let objItem = new OutputItem();
    objItem.outputType = "draw";
    objItem.data = data;
    objItem.layout = layout;
    _OUTPUT_ITEMS_LIST_.push(objItem);
}


function executeOutput(your_code:string):any{
    let code_to_be_executed = your_code + "\n _OUTPUT_ITEMS_LIST_";

    var final_results  = eval(code_to_be_executed);
    console.log("Execution results:");
    console.log(final_results);
    var return_list = [...final_results];
    _GLOBAL_RESULTS_ = [];
    _OUTPUT_ITEMS_LIST_ = [];
    return return_list;
}

export { executeOutput}