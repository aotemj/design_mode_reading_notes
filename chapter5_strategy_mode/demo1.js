// 策略模式计算奖金版本1
// var calcuateBonus = function (performanceLevel, salary) {
//   if (performanceLevel == 'S') {
//     return salary * 4;
//   }
//   if (performanceLevel == 'A') {
//     return salary * 3
//   }
//   if (performanceLevel == 'B') {
//     return salary * 2
//   }
// }
//
// console.log(calcuateBonus('B', 20000));
// console.log(calcuateBonus('S', 6000)); // 输出：24000


// 策略模式计算奖金版本2 (优化)
// var performanceS = function (salary) {
//   return salary * 4;
// }
//
// var performanceA = function (salary) {
//   return salary * 3;
// }
//
// var performanceB = function (salary) {
//   return salary * 2;
// }
//
// var calculateBonus = function (performanceLevel, salary) {
//   if (performanceLevel === 'S') {
//     performanceS(salary)
//   }
//   if (performanceLevel === 'A') {
//     performanceA(salary)
//   }
//   if (performanceLevel === 'B') {
//     performanceB(salary)
//   }
// }
//
//
// console.log(calculateBonus('A', 1000));

// 策略模式计算奖金版本3(优化)

//
// var PerformanceS = function () {
// }
//
// PerformanceS.prototype.calculate = function (salary) {
//   return salary * 4
// }
//
// var PerformanceA = function () {
// }
//
// PerformanceA.prototype.calculate = function (salary) {
//   return salary * 3
// }
//
// var PerformanceB = function () {
// }
//
// PerformanceB.prototype.calculate = function (salary) {
//   return salary * 2
// }
//
// var Bonus = function () {
//   this.salary = null;
//   this.strategy = null
// }
//
// Bonus.prototype.setSalary = function (salary) {
//   this.salary = salary
// }
//
// Bonus.prototype.setStrategy = function (strategy) {
//   this.strategy = strategy
// }
//
// Bonus.prototype.getBonus = function () {
//   return this.strategy.calculate(this.salary)
// }
//
// var bonus = new Bonus()
//
// bonus.setSalary(1000);
// bonus.setStrategy(new PerformanceS())
//
// console.log(bonus.getBonus());

// 或：

// class PerformanceS {
//   calculate(salary) {
//     return salary * 4
//   }
// }
//
// class PerformanceA {
//   calculate(salary) {
//     return salary * 3
//   }
// }
//
// class PerformanceB {
//   calculate(salary) {
//     return salary * 2
//   }
// }
//
//
// class Bonus {
//   constructor() {
//     this.salary = null
//     this.strategy = null
//   }
//
//   setSalary(salary) {
//     this.salary = salary
//   }
//
//   setStrategy(strategy) {
//     this.strategy = strategy
//   }
//
//   getBonus() {
//     return this.strategy.calculate(this.salary)
//   }
// }
//
//
// var bonus = new Bonus()
// bonus.setStrategy(new PerformanceS())
// bonus.setSalary(1000)
// console.log(bonus.getBonus());

// 策略模式计算奖金版本4(优化)
// var strategies = {
//   "S": function (salary) {
//     return salary * 4
//   },
//   "A": function (salary) {
//     return salary * 3
//   },
//   "B": function (salary) {
//     return salary * 2
//   }
// }
//
// var calculateBonus = function (level, salary) {
//   return strategies[level](salary)
// }
//
// console.log(calculateBonus("S", 2000));
// console.log(calculateBonus("A", 1000));




