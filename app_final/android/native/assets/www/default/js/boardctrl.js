
/* JavaScript content from js/boardctrl.js in folder common */
  var UndoLimit = null;
  var InProcessLimit = null;
  var DoneLimit = null;
  var confirmDeletingTask = false;
  
	$(function() {
		$("#sortable1 li, #sortable2 li, #sortable3 li ").resizable({
			containment: "parent"
		});
  
		//get default limit size
		getLimitSize();
  
		$( "ul.droptrue" ).sortable({
			connectWith: "ul",
			cursor: "move",
		});
	
		setLimitSize();//set default limit size
		createInvalidLimitSizeMessageDialog();
		createChangeLimitSizeMessageDialog();
		$("#SetLimitButton").click(function(){
			var invalidLimitSize = validateLimitSize();
			if(invalidLimitSize == null)
			{
				getLimitSize();
				setLimitSize();
				setLimitSizeTextInMessageDialog();
				$("#changeLimitSizeMessage").dialog("open");
			}
			else
			{
				$("#invalidLimitSizeMessage ul").html(invalidLimitSize);
				$("#invalidLimitSizeMessage").dialog("open");
			}
		});
	
		$( "#sortable1, #sortable2, #sortable3" ).disableSelection();
	
		createAddingTaskFailedMessageDialog();
		$("#Create").click(function(){
			if(UndoLimit == null || $("#sortable1").children().length < UndoLimit)
				createNewTask($("#Task").val());
			else
				$("#addingTaskFailedMessage").dialog("open");
		});

		createConfirmDialog();
		$("#Remove").click(function(){
			$("#deleteConfirmation").dialog("open");
		
		});
		
		createLimitSizeSpinner("#UndoSize");
		createLimitSizeSpinner("#InProcessSize");
		createLimitSizeSpinner("#DoneSize");
	});
  
  function createConfirmDialog()
  {
	$("#deleteConfirmation").dialog({
		model: true,
		title: "Delete task from the board",
		height: 250,
		autoOpen: false,
		resizable: false,
		zIndex: 9999,
		buttons: {
			"Yes": function(){
				confirmDeletingTask = true;
				removeTasks();
				$(this).dialog("close");
			},
			Cancel: function(){
				$(this).dialog("close");
			}
		},
		show: function(){
			$(this).fadeIn(650);
		},
		hide: function(){
			$(this).fadeOut(650);
		}
	});
  }
  
  function createAddingTaskFailedMessageDialog()
  {
	$("#addingTaskFailedMessage").dialog({
		model: true,
		title: "Failed to add a task",
		height: 250,
		autoOpen: false,
		resizable: false,
		zIndex: 9999,
		buttons: {
			"I see.": function(){
				$(this).dialog("close");
			}
		},
		show: function(){
			$(this).fadeIn(650);
		},
		hide: function(){
			$(this).fadeOut(650);
		}
	});
  }
  
  function createChangeLimitSizeMessageDialog()
  {
	$("#changeLimitSizeMessage").dialog({
		model: true,
		title: "Limit Size has changed",
		height: 320,
		autoOpen: false,
		resizable: false,
		zIndex: 9999,
		buttons: {
			"Yes.": function(){
				$(this).dialog("close");
			}
		},
		show: function(){
			$(this).fadeIn(650);
		},
		hide: function(){
			$(this).fadeOut(650);
		}
	});
  }
  
	function createInvalidLimitSizeMessageDialog()
	{
		$("#invalidLimitSizeMessage").dialog({
			model: true,
			title: "Invalid Limit Size",
			height: 300,
			autoOpen: false,
			resizable: false,
			zIndex: 9999,
			buttons: {
				"I see.": function(){
					$(this).dialog("close");
				}
			},
			show: function(){
			$(this).fadeIn(650);
			},
			hide: function(){
				$(this).fadeOut(650);
			}
		});
	}
  
  function limitSortableSize(sortableSelector, limitNumber)
  {
	$(sortableSelector).sortable({
		receive: function(event, ui) {
			// so if > 10
			if ($(this).children().length > limitNumber) {
				//ui.sender: will cancel the change.
				//Useful in the 'receive' callback.
				$(ui.sender).sortable('cancel');
			}
		}
	});
  }
  
	function createNewTask(message)
	{
		$("#sortable1").append($("<li class='ui-state-highlight'>"+message+"</li>").resizable({
														containment: "parent"
													}));
	}
  
  function removeTasks()
  {
	

	confirmDeletingTask = false;
  }
  
  function setLimitSize()
  {
		limitSortableSize("#sortable1", Number(UndoLimit));
		limitSortableSize("#sortable2", Number(InProcessLimit));
		limitSortableSize("#sortable3", Number(DoneLimit));
  }
  
  function getLimitSize()
  {
	UndoLimit = $("#UndoSize").val();
	InProcessLimit = $("#InProcessSize").val();
	DoneLimit = $("#DoneSize").val();
  }
  
  function setLimitSizeTextInMessageDialog()
  {
	$("#undoLimitSizeText").html(UndoLimit);
	$("#inProcessLimitSizeText").html(InProcessLimit);
	$("#doneLimitSizeText").html(DoneLimit);
  }
  
  function validateLimitSize()
  {
	var inputUndoSize = $("#UndoSize").val();
	var inputInProcessSize = $("#InProcessSize").val();
	var inputDoneSize = $("#DoneSize").val();
	var invalidLimitSizeText = "";
	
	if(!isValidLimitSize(inputUndoSize))
		invalidLimitSizeText += "<li>Undo Size</li>";
	if(!isValidLimitSize(inputInProcessSize))
		invalidLimitSizeText += "<li>InProcess Size</li>";
	if(!isValidLimitSize(inputDoneSize))
		invalidLimitSizeText += "<li>Done Size</li>";
		
	if(invalidLimitSizeText.length != 0)
		return invalidLimitSizeText;
	return null;
  }
  
	function isValidLimitSize(input)
	{
		if(Number(input) < 1 || isNaN(input))
			return false;
		return true;
	}
  
	function createLimitSizeSpinner(inputFieldSelector)
	{
		$(inputFieldSelector).spinner({
			min: 1
		});
	}