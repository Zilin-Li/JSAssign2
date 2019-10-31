/* global describe */
describe('Check the function of CalculationModel', () => {
  describe('Model class', () => {
    let calModel;
    let array1 =[1,2,3,4,5,6,7,8,9,10];
    let array2 = [10,9,8,7,6,5,4,3,2,1];
    let productArray =[10,18,24,28,30,30,28,24,18,10];
    beforeEach(() => {
      //why cannot pass this let myArray1 = [160,591,114,229,230,270,128,1657,624,1503];
      //why cannot pass this let myArray2 = [186,699,132,272,291,331,199,1890,788,1601];
      calModel = new Calculator();
    });
    describe('Function should be exist', () => {
      it('should have a products function', () => {
            expect(typeof calModel.products).toBe('function')
        });
      it('should have a sumOfArray function', () => {
            expect(typeof calModel.sumOfArray).toBe('function')
        });
      it('should have a avgOfArray function', () => {
            expect(typeof calModel.avgOfArray).toBe('function')
        });
      it('should have a lengthMultiSum function', () => {
            expect(typeof calModel.lengthMultiSum).toBe('function')
        });
      it('should have a lengthMultiAvg function', () => {
            expect(typeof calModel.lengthMultiAvg).toBe('function')
        });
      it('should have a sumMultiSum function', () => {
            expect(typeof calModel.sumMultiSum).toBe('function')
        });
      it('should have a subtraction1 function', () => {
            expect(typeof calModel.subtraction1).toBe('function')
        });
      it('should have a subtraction2 function', () => {
            expect(typeof calModel.subtraction2).toBe('function')
        });
      it('should have a results function', () => {
            expect(typeof calModel.results).toBe('function')
        });
      });

    describe('The products function of the calModel', () => {
      it('should return a array', () => {
        expect(typeof calModel.products(array1,array2)).toBe('object')
      });

      it('should return products array equal to  [10,18,24,28,30,30,28,24,18,10] ', () => {
        let array =  [10,18,24,28,30,30,28,24,18,10];
        expect(calModel.products(array1,array2)).toEqual(array);
      });
    });

    describe('The sumOfArray function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.sumOfArray(array1)).toBe('number')
      });
      it('should return 55 when executing calModel.sumOfArray([1,2,3,4,5,6,7,8,9,10]) ', () => {
          expect(calModel.sumOfArray(array1)).toBe(55)
      });
    });

    describe('The avgOfArray function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.avgOfArray(array1)).toBe('number')
      });
      it('should return 5.5 when executing calModel.avgOfArray([1,2,3,4,5,6,7,8,9,10]) ', () => {
          expect(calModel.avgOfArray(array1)).toBe(5.5)
      });
    });
    describe('The lengthMultiSum function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.lengthMultiSum(array1)).toBe('number')
      });
      it('should return 550 when executing calModel.lengthMultiSum([1,2,3,4,5,6,7,8,9,10],sumOfArray([1,2,3,4,5,6,7,8,9,10])) ', () => {
          expect(calModel.lengthMultiSum(array1,55)).toBe(550)
      });
    });

    describe('The lengthMultiAvg function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.lengthMultiAvg(array1,array2)).toBe('number')
      });
      it('should return 302.5 when executing calModel.lengthMultiAvg([1,2,3,4,5,6,7,8,9,10],[10,9,8,7,6,5,4,3,2,1])) ', () => {
          expect(calModel.lengthMultiAvg(array1,array2)).toBe(302.5)
      });
    });

    describe('The sumMultiSum function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.sumMultiSum(array1,array2)).toBe('number')
      });
      it('should return 3025 when executing calModel.sumMultiSum([1,2,3,4,5,6,7,8,9,10],[10,9,8,7,6,5,4,3,2,1])) ', () => {
          expect(calModel.sumMultiSum(array1,array2)).toBe(3025)
      });
    });

    describe('The subtraction1 function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.subtraction1(array1,array2)).toBe('number')
      });
      it('should return -825 when executing calModel.subtraction1([1,2,3,4,5,6,7,8,9,10],[10,9,8,7,6,5,4,3,2,1])) ', () => {
          expect(calModel.subtraction1(array1,array2)).toBe(-825)
      });
    });

    describe('The subtraction2 function of the calModel', () => {
      it('should return a number', () => {
          expect(typeof calModel.subtraction2(array1,array2)).toBe('number')
      });
      it('should return -82.5 when executing calModel.subtraction2([1,2,3,4,5,6,7,8,9,10],[10,9,8,7,6,5,4,3,2,1])) ', () => {
          expect(calModel.subtraction2(array1,array2)).toBe(-82.5)
      });
    });
  })

})
