/* global describe beforeEach it expect Correlation */
describe('Basic Check For Original Source Code', () => {
  describe('MyMaths class', () => {
    let myMaths
    beforeEach(() => {
      //why cannot pass this let myArray1 = [160,591,114,229,230,270,128,1657,624,1503];
      //why cannot pass this let myArray2 = [186,699,132,272,291,331,199,1890,788,1601];
      myMaths = new MyMaths();
    })

    describe('the MyMaths', () => {
      
      it('should have a getNumArrayAverage function', () => {
            expect(typeof myMaths.getNumArrayAverage).toBe('function')
        })
        
      it('should have a getSumProduct2Arrays function', () => {
            expect(typeof myMaths.getSumProduct2Arrays).toBe('function')
        })        
        
      it('should have a getSumNumArray function', () => {
            expect(typeof myMaths.getSumNumArray).toBe('function')
        }) 
        
      it('should have a isValidArrays function', () => {
            expect(typeof myMaths.isValidArrays).toBe('function')
        })         
        
      describe('The getNumArrayAverage function of the MyMaths', () => {
          
            it('should return a number', () => {        
                expect(typeof myMaths.getNumArrayAverage([160,591,114,229,230,270,128,1657,624,1503])).toBe('number')
            })
            
            it('should return 550.6 when executing myMaths.getNumArrayAverage([160,591,114,229,230,270,128,1657,624,1503]) ', () => {
                expect(myMaths.getNumArrayAverage([160,591,114,229,230,270,128,1657,624,1503])).toBe(550.6)
            })
      })
      
      describe('The getSumProduct2Arrays function of the MyMaths', () => {
          
            it('should return a number', () => {        
                expect(typeof myMaths.getSumProduct2Arrays([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe('number')
            })
            
            it('should return 6731722 when executing myMaths.getSumProduct2Arrays([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]) ', () => {
                expect(myMaths.getSumProduct2Arrays([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe(6731722)
            })
      })
      
      describe('The getSumNumArray function of the MyMaths', () => {
          
            it('should return a number', () => {        
                expect(typeof myMaths.getSumNumArray([160,591,114,229,230,270,128,1657,624,1503])).toBe('number')
            })
            
            it('should return 5506 when executing myMaths.getSumNumArray([160,591,114,229,230,270,128,1657,624,1503]) ', () => {
                expect(myMaths.getSumNumArray([160,591,114,229,230,270,128,1657,624,1503])).toBe(5506)
            })
      })         
      
      describe('The isValidArrays function of the MyMaths', () => {
          
            it('should return a boolean', () => {        
                expect(typeof myMaths.isValidArrays([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe('boolean')
            })
            
            it('should return true when executing myMaths.isValidArrays([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]) ', () => {
                expect(myMaths.isValidArrays([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe(true)
            })
      })      
    })
  })
  
  describe('Correlation class', () => {
    let correlation
    beforeEach(() => {
      correlation = new Correlation();
    })
    
    describe('the Correlation', () => {
      it('should have a getRxy function', () => {
            expect(typeof correlation.getRxy).toBe('function')
        })   
      it('should have a getRxySquare function', () => {
            expect(typeof correlation.getRxySquare).toBe('function')
        })           
    })
    describe('the Correlation which extended MyMaths', () => {

      it('should have a getNumArrayAverage function', () => {
            expect(typeof correlation.getNumArrayAverage).toBe('function')
        })
        
      it('should have a getSumProduct2Arrays function', () => {
            expect(typeof correlation.getSumProduct2Arrays).toBe('function')
        })        
        
      it('should have a getSumNumArray function', () => {
            expect(typeof correlation.getSumNumArray).toBe('function')
        }) 
        
      it('should have a isValidArrays function', () => {
            expect(typeof correlation.isValidArrays).toBe('function')
        })  
    })

    describe('The getRxy function of the Correlation', () => {
          
            it('should return a number', () => {        
                expect(typeof correlation.getRxy([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe('number')
            })
            
            it('should return 0.9978340665177264 when executing correlation.getRxy([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]) ', () => {
                expect(correlation.getRxy([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe(0.9978340665177264)
            })    
    })    
    
    describe('The getRxySquare function of the Correlation', () => {
          
            it('should return a number', () => {        
                expect(typeof correlation.getRxySquare([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe('number')
            })
            
            it('should return 0.9956728243033025 when executing correlation.getRxySquare([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]) ', () => {
                expect(correlation.getRxySquare([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe(0.9956728243033025)
            })    
    })       
  })
  
  describe('Regression class', () => {
    let correlation
    beforeEach(() => {
      regression = new Regression();
    })
    
    describe('the Regression', () => {
      it('should have a getBeta0 function', () => {
            expect(typeof regression.getBeta0).toBe('function')
        })   
      it('should have a getBeta1 function', () => {
            expect(typeof regression.getBeta1).toBe('function')
        })           
    })
    
    describe('the Regression which extended MyMaths', () => {

      it('should have a getNumArrayAverage function', () => {
            expect(typeof regression.getNumArrayAverage).toBe('function')
        })
        
      it('should have a getSumProduct2Arrays function', () => {
            expect(typeof regression.getSumProduct2Arrays).toBe('function')
        })        
        
      it('should have a getSumNumArray function', () => {
            expect(typeof regression.getSumNumArray).toBe('function')
        }) 
        
      it('should have a isValidArrays function', () => {
            expect(typeof regression.isValidArrays).toBe('function')
        })  
    })

    describe('The getBeta0 function of the Regression', () => {

            it('should return a number', () => {        
                expect(typeof regression.getBeta0([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe('number')
            })
            
            it('should return 1.091345458388111 when executing regression.getBeta0([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]) ', () => {
                expect(regression.getBeta0([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe(1.091345458388111)
            })    
    })    
    
    describe('The getBeta1 function of the Regression', () => {
          
            it('should return a number', () => {        
                expect(typeof regression.getBeta1([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe('number')
            })
            
            it('should return 38.00519061150601 when executing regression.getBeta1([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]) ', () => {
                expect(regression.getBeta1([160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601])).toBe(38.00519061150601)
            })    
    })       
  })  
  
})