'use strict';

/**
 * @ngdoc function
 * @name iVidexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iVidexApp
 */
angular.module('iVidexApp')
  .controller('PatientCtrl', function (ngProgressLite,$log,API,$rootScope,$scope, $uibModal,promise,$state) {
  	 
	  $scope.auth={'loaded':false}
	  $scope.loadAuth=function(){
		  $scope.currentPatient.lastWeekAttempts=[];
		  var today=new Date(); 	
		  $scope.currentPatient.attempts.forEach(function(ele,index,array){
		  	 var attemptDate=new Date(ele['createdAt']); 
			 var endDate=today.setDate(today.getDate()-7);
			 if(attemptDate>endDate){
				 $scope.currentPatient.lastWeekAttempts.push(ele);
			 }	
		  });
		  $scope.auth.loaded=true;
	 
	  }
	  $scope.loadAuth();
	  $scope.deleteAuth=function(id){
		  ngProgressLite.start();
	  	API.deleteAuth(id).then(function(res){
			
			API.deleteUser(id).then(function(res){
				$state.go('main');
			},function(reason){console.log(reason)})
	  		
			
	  	},function(reason){console.log(reason)})
	  }
	  $scope.btn={
		  'archive':{
			  'label':'Archive'
		  }
	  }  
	  $scope.isEmpty = function(value){
		  console.log(value);
		  if(value=="<br>" || value=="")
			  {	return false	}
		  else
			  {	return true }
		  
		
	  }
	  $scope.mainFlt={"active":true};
	  $scope.openSingle=function(prescription){
		  prescription.status=prescription.id;
		  $scope.mainFlt={"status":prescription.id};
		
	  }
	  $scope.closeSingle=function(prescription){
		  delete prescription.status
		  $scope.mainFlt={"active":true};
		
	  }
	  $scope.updateHolds=function(holds,exId){
		  ngProgressLite.start();
		  var data={
		  	"holds": holds,
		  }
		  API.updateEx(exId,data).then(function(res){
		  	ngProgressLite.done();
		  },function(reason){ngProgressLite.done();});
	  }
	  $scope.updateReps=function(reps,exId){
		  ngProgressLite.start();
		  var data={
		  	"reps": reps,
		  }
		  API.updateEx(exId,data).then(function(res){
		  	ngProgressLite.done();
		  },function(reason){ngProgressLite.done();});
	  }
	  $scope.updateWeeks=function(weeks,exId){
		  ngProgressLite.start();
		  var data={
		  	"weeks": weeks,
		  }
		  API.updateEx(exId,data).then(function(res){
		  	ngProgressLite.done();
		  },function(reason){ngProgressLite.done();});
	  }
	  
	  $scope.archive=function(prescription,val,index){
		   ngProgressLite.start();
		  var data={
		  	  "active": val
		  }
		  API.savePrescription(prescription.id,data).then(function(res){
			  //$scope.currentPatient.prescriptions.splice(index,1);
			  prescription.active=res.data.active;
			  ngProgressLite.done();
			
		  },function(reason){console.log(reason)})
	  	
	  } 
	  $scope.saveSaveAs=function(prescription){
		  if ($scope.action=="save"){
			// var frm = angular.element('#frmId');
			$scope.savePrescription(prescription['id'],prescription['surgeryDate'],prescription['injury'],prescription['text']);
			  
		  }
		  if ($scope.action=="saveAs"){
			  ngProgressLite.start();
			//Create Protocol
			  var protocol={
				  "name":prescription.injury
			  }
			  API.postProtocol(protocol).then(function(res){
			  //add exercise array
				  
				  var _exData=prescription.exercises;
				  _exData.forEach(function(ex,index,exArray){
					  ex.assigned_protocol=res.data.id;
					  delete ex.assigned_prescription;
					  delete ex.id;
					  delete ex.createdAt;
					  delete ex.updatedAt;
					  delete ex.active;
					  
				  });
				 //modify exData accordingly
				  console.log(_exData);
				  var exData={
				  	"exercises":_exData
				  }
				  API.postToProtocol(res.data.id,exData).then(function(res2){
				  	
					  ngProgressLite.done();
				  },function(reason){console.log(reason)});	
			  },function(reason){console.log(reason)})
			  
			
		  }
	  }
	  $scope.closeSingleBtn=function(prescription,index,keyCode){
		    if(keyCode==91){
				return $scope.deletePrescription(prescription.id,index);
			}
			else 
			  {
				  return $scope.closeSingle(prescription);
			  }
	  }
	  $scope.archiveBtn=function(prescription,val,index,keyCode){
		  if(keyCode==91){
			  return $scope.deletePrescription(prescription.id,index);
		  } else
		  {
	  	return $scope.archive(prescription,val)
		  }
	  }
	  $scope.savePrescription=function(id,surgeryDate,injury, text){
		  ngProgressLite.start();
		 var  data={
			  	"surgeryDate": surgeryDate,
  				"injury": injury,
  				"text": text
		  }
		  API.savePrescription(id,data).then(function(res){
			  ngProgressLite.done();
			  $scope.action="saveAs";
			  $scope.actionLabel="save as protocol";
		  }, function(reason){})
	  }
	  
	  $scope.newPrescription=function(){
		  ngProgressLite.start();
		  var data={
		    "client":$scope.currentPatient.id,
		    "surgeryDate":"09/11/1998",
		    "injury":"Injury",
		    "text":"Indications for patient"
		  }
		  
		  API.newPrescription(data).then(function(res){
			  res.data.exercises=[];
			  $scope.currentPatient.prescriptions.push(res.data);
			  $scope.mainFlt={"active":true};
		  	ngProgressLite.done();
		  }, function(reason){console.log(reason);ngProgressLite.done();});
	  }
	  
	  $scope.deletePrescription=function(id,index){
		  API.deletePrescription(id).then(function(res){
			  $scope.currentPatient.prescriptions.splice(index,1);
			  ngProgressLite.done();
		  },function(reason){console.log(reason)});
	  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////START WATCHERS//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  	
		$scope.initDate=true;
    	$scope.$watch('currentPatient.prescriptions[0].surgeryDate', function(value) {
  		if( $scope.initDate==true){
  			$scope.action="saveAs"  ;
  			$scope.actionLabel="save as protocol";
  			$scope.surgeryDateOriginalValue=value;
  			$scope.initDate=false;
  		} else{
  			if(value!=$scope.surgeryDateOriginalValue){
  				$scope.action="save";
  				$scope.actionLabel="save"
  			}  else {	$scope.action="saveAs";
  						$scope.actionLabel="save as protocol";
  					}
  		}
    		//$scope.action="save";
    	   });	
	 	  $scope.initInjury=true;
	     	$scope.$watch('currentPatient.prescriptions[0].injury', function(value) {
	   		if( $scope.initInjury==true){
	   			$scope.action="saveAs"  ;
	   			$scope.actionLabel="save as protocol";
	   			$scope.InjuryOriginalValue=value;
	   			$scope.initInjury=false;
	   		} else{
	   			if(value!=$scope.InjuryOriginalValue){
	   				$scope.action="save";
	   				$scope.actionLabel="save"
	   			}  else {	$scope.action="saveAs";
	   						$scope.actionLabel="save as protocol";
	   					}
	   		}
	     		//$scope.action="save";
	     	   });	
	 $scope.init=true;	   
  	$scope.$watch('currentPatient.prescriptions[0].text', function(value) {
  		//alert(value);
		
		if( $scope.init==true){
			$scope.action="saveAs"  ;
			$scope.actionLabel="save as protocol";
			$scope.originalValue=value;
			$scope.init=false;
		} else{
			if(value!=$scope.originalValue){
				$scope.action="save";
				$scope.actionLabel="save"
			}  else {	$scope.action="saveAs";
						$scope.actionLabel="save as protocol";
					}
		}
  		//$scope.action="save";
  	   });	
	   
	$scope.initDate2=true;
   	$scope.$watch('currentPatient.prescriptions[1].surgeryDate', function(value) {
 		if( $scope.initDate2==true){
 			$scope.action="saveAs"  ;
 			$scope.actionLabel="save as protocol";
 			$scope.surgeryDateOriginalValue2=value;
 			$scope.initDate2=false;
 		} else{
 			if(value!=$scope.surgeryDateOriginalValue2){
 				$scope.action="save";
 				$scope.actionLabel="save"
 			}  else {	$scope.action="saveAs";
 						$scope.actionLabel="save as protocol";
 					}
 		}
   		//$scope.action="save";
   	   });	
 	  $scope.initInjury2=true;
     	$scope.$watch('currentPatient.prescriptions[1].injury', function(value) {
   		if( $scope.initInjury2==true){
   			$scope.action="saveAs"  ;
   			$scope.actionLabel="save as protocol";
   			$scope.InjuryOriginalValue2=value;
   			$scope.initInjury2=false;
   		} else{
   			if(value!=$scope.InjuryOriginalValue2){
   				$scope.action="save";
   				$scope.actionLabel="save"
   			}  else {	$scope.action="saveAs";
   						$scope.actionLabel="save as protocol";
   					}
   		}
     		//$scope.action="save";
     	   });	
 $scope.init2=true;	   
 	$scope.$watch('currentPatient.prescriptions[1].text', function(value) {
 		//alert(value);
	
	if( $scope.init2==true){
		$scope.action="saveAs"  ;
		$scope.actionLabel="save as protocol";
		$scope.originalValue=value;
		$scope.init2=false;
	} else{
		if(value!=$scope.originalValue2){
			$scope.action="save";
			$scope.actionLabel="save"
		}  else {	$scope.action="saveAs";
					$scope.actionLabel="save as protocol";
				}
	}
 		//$scope.action="save";
 	   });		   	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////END WATCHERS//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	      
	   ngProgressLite.done();
	  //$scope.currentPatient=$rootScope.currentPatient;
	  //$scope.areas= ['area1', 'area2', 'area3'];
  // Initialization
      $scope.onKeyDownResult = "";
      $scope.onKeyUpResult = "";
      $scope.onKeyPressResult = "";

      // Utility functions

      

      // Event handlers
      $scope.onKeyDown = function ($event) {
		  $rootScope.pressed= $event.keyCode;
		  $scope.pressed = $event.keyCode;
      };

      
	  
	  
	  $scope.getDate = function(date){
	  	var newDate= new angular.mock.TzDate(0, date);
		var result="";
		result=(newDate.getMonth()+1).toString()+"/"+newDate.getDate().toString()+"/"+newDate.getFullYear().toString();
		return result;
	  }
	  $scope.openDate = function($event) {
	     $scope.status.opened = true;
	   };
	   $scope.dateOptions = {
	       formatYear: 'yy',
	       startingDay: 1
	     };

	     $scope.formats = ['MMMM dd, yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	     $scope.format = $scope.formats[0];

	     $scope.status = {
	       opened: false
	     };
		 
		   
	 $scope.open = function (size,prescription) {
		
	
		  API.getAreas().then(function(res){
			   var a=res.data;
		      var modalInstance = $uibModal.open({
		        animation: true,
		        templateUrl: 'views/myModalContent.html',
		        controller: 'ModalInstanceCtrl',
		        size: size,
		        resolve: {
		          areas: function () {
					  
					  //var data;
					  
					  
					  a.prescription=prescription;
					  return a;	
		          }       
		        }
		      });

		      modalInstance.result.then(function (prescription) {
				  
				 
				  console.log(prescription);
				  
				
				
		      }, function () {
		        $log.info('Modal dismissed at: ' + new Date());
		      });
		  
		});
	};
	
	$scope.currentPatient=promise.data; 
	$scope.removeEx=function(id){
		ngProgressLite.start();
		
		API.deleteEx(id).then(function(res){
		ngProgressLite.done();
		},function(reason){
		Alert('API.deleteEx() failed');
		$state.go('patient',{id:$scope.currentPatient.id});
		
		})
	}  
	 
  });
  angular.module('iVidexApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, areas,API) {
	  console.log("areas");
	  $scope.items=areas;
       $scope.selected = {
        item: $scope.items[0].videos[0]
      };
	  $scope.getProtocols=function(){
		  API.getProtocols().then(function(res){
			  $scope.protocols=res.data;
		  },function(reason){console.log(reason)});
	  }	  

      $scope.ok = function () {
        $modalInstance.close($scope.items.prescription);
      };
	  $scope.add=function(video){
		  
		  var data={
		    "holds":3,
			"reps":10,
			"weeks":2,
			"weight":0,

			"assigned_exercise":video.id,
			"assigned_prescription":$scope.items.prescription['id']
		  }
		  
		  API.postExToPrescription(data).then(function(res){
			  data.id=res.data.id;
			  data.name=video.title;
			  $scope.items.prescription['exercises'].push(data);
			
		  },function(reason){})
	  }
	  
	  $scope.addProtocol=function(exercises){
		  
		  // add "assigned_prescription":$scope.items.prescription['id']
		  // 				and 
		  // REMOVE "assigned_protocol" property delete
		  exercises.forEach(function(ex,index,exArray){
		  	
			  delete ex.assigned_protocol;
			  delete ex.id;
			  delete ex.createdAt;
			  delete ex.updatedAt;
			  ex.assigned_prescription =$scope.items.prescription['id']
		  });
		  var data={
			  "exercises":exercises
		  }
		  
	
		  var _exercises=$scope.items.prescription['exercises'];
		  //purge current exercises to re add them all with new one in the data obj
		  
		  _exercises.forEach(function(ex,index,exArray){
			  delete ex.id;
			  delete ex.createdAt;
			  delete ex.updatedAt;
			  data.exercises.push(ex);
			  
		  });
		  
		  
		  
		  
		  
		  API.savePrescription($scope.items.prescription['id'],data).then(function(res){
			  
			  	$scope.items.prescription['exercises']=res.data.exercises;
			  
			  
			  
			  
			
		  },function(reason){})
	  }
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });