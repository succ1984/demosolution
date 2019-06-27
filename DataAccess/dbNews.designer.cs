﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.1
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

namespace CSFramework.DataAccess
{
	using System.Data.Linq;
	using System.Data.Linq.Mapping;
	using System.Data;
	using System.Collections.Generic;
	using System.Reflection;
	using System.Linq;
	using System.Linq.Expressions;
	using System.ComponentModel;
	using System;
	
	
	[global::System.Data.Linq.Mapping.DatabaseAttribute(Name="dbNews")]
	public partial class dbNewsDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region 可扩展性方法定义
    partial void OnCreated();
    partial void InsertCategory(Category instance);
    partial void UpdateCategory(Category instance);
    partial void DeleteCategory(Category instance);
    partial void InsertNews(News instance);
    partial void UpdateNews(News instance);
    partial void DeleteNews(News instance);
    #endregion
		
		public dbNewsDataContext() : 
				base(global::CSFramework.DataAccess.Properties.Settings.Default.dbNewsConnectionString, mappingSource)
		{
			OnCreated();
		}
		
		public dbNewsDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public dbNewsDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public dbNewsDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public dbNewsDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public System.Data.Linq.Table<Category> Category
		{
			get
			{
				return this.GetTable<Category>();
			}
		}
		
		public System.Data.Linq.Table<News> News
		{
			get
			{
				return this.GetTable<News>();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.Category")]
	public partial class Category : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private int _nCategoryID;
		
		private int _nParentCategoryID;
		
		private string _szCategoryName;
		
		private string _szDescription;
		
		private System.Nullable<int> _nOrder;
		
    #region 可扩展性方法定义
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnnCategoryIDChanging(int value);
    partial void OnnCategoryIDChanged();
    partial void OnnParentCategoryIDChanging(int value);
    partial void OnnParentCategoryIDChanged();
    partial void OnszCategoryNameChanging(string value);
    partial void OnszCategoryNameChanged();
    partial void OnszDescriptionChanging(string value);
    partial void OnszDescriptionChanged();
    partial void OnnOrderChanging(System.Nullable<int> value);
    partial void OnnOrderChanged();
    #endregion
		
		public Category()
		{
			OnCreated();
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_nCategoryID", AutoSync=AutoSync.OnInsert, DbType="Int NOT NULL IDENTITY", IsPrimaryKey=true, IsDbGenerated=true)]
		public int nCategoryID
		{
			get
			{
				return this._nCategoryID;
			}
			set
			{
				if ((this._nCategoryID != value))
				{
					this.OnnCategoryIDChanging(value);
					this.SendPropertyChanging();
					this._nCategoryID = value;
					this.SendPropertyChanged("nCategoryID");
					this.OnnCategoryIDChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_nParentCategoryID", DbType="Int NOT NULL")]
		public int nParentCategoryID
		{
			get
			{
				return this._nParentCategoryID;
			}
			set
			{
				if ((this._nParentCategoryID != value))
				{
					this.OnnParentCategoryIDChanging(value);
					this.SendPropertyChanging();
					this._nParentCategoryID = value;
					this.SendPropertyChanged("nParentCategoryID");
					this.OnnParentCategoryIDChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_szCategoryName", DbType="NVarChar(100) NOT NULL", CanBeNull=false)]
		public string szCategoryName
		{
			get
			{
				return this._szCategoryName;
			}
			set
			{
				if ((this._szCategoryName != value))
				{
					this.OnszCategoryNameChanging(value);
					this.SendPropertyChanging();
					this._szCategoryName = value;
					this.SendPropertyChanged("szCategoryName");
					this.OnszCategoryNameChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_szDescription", DbType="NVarChar(4000)")]
		public string szDescription
		{
			get
			{
				return this._szDescription;
			}
			set
			{
				if ((this._szDescription != value))
				{
					this.OnszDescriptionChanging(value);
					this.SendPropertyChanging();
					this._szDescription = value;
					this.SendPropertyChanged("szDescription");
					this.OnszDescriptionChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_nOrder", DbType="Int")]
		public System.Nullable<int> nOrder
		{
			get
			{
				return this._nOrder;
			}
			set
			{
				if ((this._nOrder != value))
				{
					this.OnnOrderChanging(value);
					this.SendPropertyChanging();
					this._nOrder = value;
					this.SendPropertyChanged("nOrder");
					this.OnnOrderChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.News")]
	public partial class News : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private int _nNewsID;
		
		private int _CategoryID;
		
		private string _szTitle;
		
		private string _szSubTitle;
		
		private string _szContent;
		
		private System.Nullable<System.DateTime> _dCreationDate;
		
    #region 可扩展性方法定义
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnnNewsIDChanging(int value);
    partial void OnnNewsIDChanged();
    partial void OnCategoryIDChanging(int value);
    partial void OnCategoryIDChanged();
    partial void OnszTitleChanging(string value);
    partial void OnszTitleChanged();
    partial void OnszSubTitleChanging(string value);
    partial void OnszSubTitleChanged();
    partial void OnszContentChanging(string value);
    partial void OnszContentChanged();
    partial void OndCreationDateChanging(System.Nullable<System.DateTime> value);
    partial void OndCreationDateChanged();
    #endregion
		
		public News()
		{
			OnCreated();
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_nNewsID", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int nNewsID
		{
			get
			{
				return this._nNewsID;
			}
			set
			{
				if ((this._nNewsID != value))
				{
					this.OnnNewsIDChanging(value);
					this.SendPropertyChanging();
					this._nNewsID = value;
					this.SendPropertyChanged("nNewsID");
					this.OnnNewsIDChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_CategoryID", DbType="Int NOT NULL")]
		public int CategoryID
		{
			get
			{
				return this._CategoryID;
			}
			set
			{
				if ((this._CategoryID != value))
				{
					this.OnCategoryIDChanging(value);
					this.SendPropertyChanging();
					this._CategoryID = value;
					this.SendPropertyChanged("CategoryID");
					this.OnCategoryIDChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_szTitle", DbType="NVarChar(255) NOT NULL", CanBeNull=false)]
		public string szTitle
		{
			get
			{
				return this._szTitle;
			}
			set
			{
				if ((this._szTitle != value))
				{
					this.OnszTitleChanging(value);
					this.SendPropertyChanging();
					this._szTitle = value;
					this.SendPropertyChanged("szTitle");
					this.OnszTitleChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_szSubTitle", DbType="NVarChar(500)")]
		public string szSubTitle
		{
			get
			{
				return this._szSubTitle;
			}
			set
			{
				if ((this._szSubTitle != value))
				{
					this.OnszSubTitleChanging(value);
					this.SendPropertyChanging();
					this._szSubTitle = value;
					this.SendPropertyChanged("szSubTitle");
					this.OnszSubTitleChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_szContent", DbType="NVarChar(MAX) NOT NULL", CanBeNull=false)]
		public string szContent
		{
			get
			{
				return this._szContent;
			}
			set
			{
				if ((this._szContent != value))
				{
					this.OnszContentChanging(value);
					this.SendPropertyChanging();
					this._szContent = value;
					this.SendPropertyChanged("szContent");
					this.OnszContentChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_dCreationDate", DbType="DateTime")]
		public System.Nullable<System.DateTime> dCreationDate
		{
			get
			{
				return this._dCreationDate;
			}
			set
			{
				if ((this._dCreationDate != value))
				{
					this.OndCreationDateChanging(value);
					this.SendPropertyChanging();
					this._dCreationDate = value;
					this.SendPropertyChanged("dCreationDate");
					this.OndCreationDateChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
}
#pragma warning restore 1591
