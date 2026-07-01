"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { 
    Bell, 
    History, 
    Star, 
    Calendar, 
    Clock, 
    ChevronDown, 
    MapPin, 
    Link2, 
    Bold, 
    Italic, 
    List, 
    Paperclip, 
    SpellCheck,
    SendHorizonal
} from "lucide-react";
import ButtonImportanceLevel from "./ButtonImportanceLevel";
import TagChip from "./TagChip";
import { useSession } from "next-auth/react";
import FloatingAlert, {AlertType} from "../components/FloatingAlert";

interface EntityDetail {
    name: string,
    entityType: string
}

interface EventFormData {
    [key: string]: unknown; // Allows other form fields
    relatedEntities?: EntityDetail[];
}

type SiteCategory = 'ONLINE' | 'ONSITE';

export default function ScheduleEventPage() {
    // user session
    const { data: session, status} = useSession();
    const token = session?.accessToken;
    
    // Forn field states
    const [title, setTitle] = useState<string>("New Event");
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [endDateTime, setEndDateTime] = useState<string>("");
    const [siteCategory, setSiteCategory] = useState<SiteCategory>("ONLINE");
    const [importance, setImportance] = useState("HIGH");
    const [url, setUrl] = useState<string>("");
    const [tags, setTags] = useState<EntityDetail[]>([]);
    const [description, setDescription] = useState<string>("");

    // State for Importance level toggle selection
    const options = [
        { value: 'CRITICAL', label: 'Critical', color: '#f8a9a0' },
        { value: 'HIGH', label: 'High', color: '#adc6ff' },
        { value: 'MEDIUM', label: 'Medium', color: '#4edea3' },
        { value: 'LOW', label: 'Low', color: '#c2c6d6' },
    ];
    
    // State for interactive tag removal
    const removetag = (tagToRemove: EntityDetail) => {
        setTags(tags.filter(
            tag => tag.name.toLowerCase() !== tagToRemove.name.toLowerCase() || 
                tag.entityType.toLowerCase() !== tagToRemove.entityType.toLowerCase()
        ));
    };

    const handleRemoveTagEntity = (
        event: React.MouseEvent<HTMLButtonElement>,
        name: string,
        type: string
    ) => {
        event.preventDefault();
        event.stopPropagation();
        removetag({name: name as string, entityType: type as string})
    }

    // Entity relation input hanlder
    const [inputEntity, setInputEntity] = useState<EntityDetail>();
    const entityNameRef = useRef<HTMLInputElement>(null)
    const entityTypeRef = useRef<HTMLSelectElement>(null)

    const handleInputEntity = () => {
        const entityNameValue = entityNameRef.current?.value
        const entityTypeValue = entityTypeRef.current?.value

        const inputEntity = {
            name: entityNameValue as string, 
            entityType: entityTypeValue?.toUpperCase() as string
        }

        if (entityNameValue || entityTypeValue) {
            const isDuplicate = tags.some(
                tag => tag.name.toLowerCase() === inputEntity.name.toLowerCase() && 
                    tag.entityType === inputEntity.entityType.toLowerCase()
            );

            if (!isDuplicate) {
                setTags([...tags, inputEntity]);
                setInputEntity(inputEntity); // Assuming this is another state setter
            }
            
        }
    }

    // handling submit the form
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertTitle, setAlertTitle] = useState<string>("");
    const [alertType, setAlertType] = useState<AlertType>("info");

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const dataInput = Object.fromEntries(formData) as EventFormData;

        dataInput.title = dataInput.input === undefined  ? "New Event" : dataInput.input
        dataInput.relatedEntities = [tags[0]];
        dataInput.startDateTime = `${dataInput.startDateTime}:00+07:00`;
        dataInput.endDateTime = `${dataInput.endDateTime}:00+07:00`;

        // DEBUGGING
        console.log(dataInput)

        const response = await fetch("http://localhost:8080/api/events/create", {
            method: "POST",
            body: JSON.stringify(dataInput),
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })

        let data = null;
        if (response.status !== 204) {
            const text = await response.text(); // Get raw text first
            data = text ? JSON.parse(text) : null; // Only parse if text isn't empty
        }

        if (!response.ok) {
            setShowAlert(true)
            setAlertType("error");
            setAlertTitle(data.message);
            setAlertMessage(data.data);
            // throw new Error(`Server error: ${response.status}`);
        }
        
        if (response.status == 201) {
            const text = await response.text(); // Get raw text first
            data = text ? JSON.parse(text) : null;

            setShowAlert(true)
            setAlertType("success");
            setAlertTitle(data.message);
            setAlertMessage(data.data)
        }

        setTitle("New Event");
        setStartDateTime("");
        setEndDateTime("");
        setSiteCategory("ONLINE");
        setUrl("");
        setTags([]);
        setDescription("");

        console.log(data)
    }

    return (
    <div className="flex-1 min-h-screen flex flex-col bg-[#0c1322]">
        {
            showAlert && (
                <FloatingAlert
                    type={alertType}
                    title={alertTitle}
                    message={alertMessage}
                    duration={5000}
                    onClose={() => setShowAlert(false)}
                />
            )
        }
        {/* TopAppBar Header */}
        <header className="h-16 flex justify-between items-center px-8 w-full bg-[#0c1322] border-b border-[#424754]/50 sticky top-0 z-40">
            <div className="flex items-center gap-6">
            <span className="text-2xl font-semibold text-[#dce2f7]">Schedule Event</span>
            </div>
            <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[#c2c6d6]">
                <Bell className="cursor-pointer hover:text-[#adc6ff] transition-all" size={20} />
                <History className="cursor-pointer hover:text-[#adc6ff] transition-all" size={20} />
                <Star className="cursor-pointer hover:text-[#adc6ff] transition-all" size={20} />
            </div>
            <div className="h-8 w-[1px] bg-[#424754] mx-2"></div>
            <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                alt="User Profile" 
                className="w-8 h-8 rounded-full border border-[#424754]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcMrJhf7zX3bGnl08Wzovfk8mmP0RHilm9tlYltOfp9J8aI6u-KQ46KNCFu23FilTM3NmhU7wZf3v4fQWHBRzdAUuG3AfZEarmxzAC8W4Tnrp5hmce0RGJL5N4ak54i29MrQbH6fJ62pQwfrCW8mY0tIuqj2EgE7TPiH0hM5hqBV2OVOArirgPTam0HJppk-0qhJeY6b03cxHkMaMT2IOXKLf07fehME2dVMfKrohO1P-4hP34V4UbDYOeIVv13-pzq93di0st5iDv"
                />
                <span className="text-xs font-bold text-[#adc6ff]">Current Event</span>
            </div>
            </div>
        </header>

        {/* Canvas / Form Body Container */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0c1322] relative">
            <div className="max-w-4xl mx-auto space-y-6 pb-12">

            {/* Core Interactive Card Structure */}
            <div className="bg-[#141b2b] border border-[#424754]/50 rounded-xl p-6 shadow-sm">
                    <form 
                        onSubmit={(e) => handleSubmit(e)} 
                        className="space-y-6"
                        >
                        {/* Event Title Row */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#c2c6d6] tracking-wider">EVENT TITLE</label>
                            <input 
                                className="w-full bg-[#0c1322] text-2xl font-semibold text-[#dce2f7] border border-[#424754]/50 px-4 py-2 rounded focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] transition-all placeholder:opacity-30" 
                                placeholder="Strategy Planning Q4..." 
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                            />
                        </div>

                        {/* Date and Time Range Block */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-[#c2c6d6] tracking-wider">START DATE & TIME</label>
                                <div className="flex bg-[#0c1322] border border-[#424754]/50 rounded p-1 items-center focus-within:border-[#adc6ff] focus-within:ring-1 focus-within:ring-[#adc6ff] transition-all">
                                    <Calendar className="mx-3 text-[#c2c6d6]" size={18} />
                                    <input 
                                        className="bg-transparent border-none text-[#dce2f7] focus:ring-0 text-sm w-full py-1.5" 
                                        type="datetime-local" 
                                        name="startDateTime"
                                        value={startDateTime}
                                        onChange={(e) => setStartDateTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#c2c6d6] tracking-wider">END DATE & TIME</label>
                            <div className="flex bg-[#0c1322] border border-[#424754]/50 rounded p-1 items-center focus-within:border-[#adc6ff] focus-within:ring-1 focus-within:ring-[#adc6ff] transition-all">
                                <Clock className="mx-3 text-[#c2c6d6]" size={18} />
                                <input 
                                    className="bg-transparent border-none text-[#dce2f7] focus:ring-0 text-sm w-full py-1.5" 
                                    type="datetime-local"
                                    name="endDateTime" 
                                    value={endDateTime}
                                    onChange={(e) => setEndDateTime(e.target.value)}
                                    required
                                />
                            </div>
                            </div>
                        </div>

                        {/* Category & Importance Picker Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#c2c6d6] tracking-wider">CATEGORY</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#0c1322] border border-[#424754]/50 px-4 py-3.5 rounded appearance-none text-sm text-[#dce2f7] focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] transition-all"
                                    name="siteCategory"
                                    // value={siteCategory}
                                    // onChange={(e) => setSiteCategory(e.target.value)}
                                >
                                    <option>ONLINE</option>
                                    <option>ONSITE</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c2c6d6]" size={18} />
                            </div>
                            </div>
                            <div className="space-y-1">
                            <span className="block text-xs font-semibold text-[#c2c6d6] tracking-wider">
                                IMPORTANCE LEVEL
                            </span>
                            <div className="flex gap-2 h-[48px]" role="radiogroup" aria-label="Importance Level">
                                {options.map((opt) => {
                                    return (<ButtonImportanceLevel 
                                        key={opt.value}
                                        opt={opt} 
                                        importance={importance} 
                                        onChange={() => setImportance(opt.value)} />)
                                })}
                            </div>
                            </div>
                        </div>

                        {/* Location Input Form Elements */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-[#c2c6d6] tracking-wider">URL LOCATION</label>
                            <a className="text-xs font-medium text-[#adc6ff] flex items-center gap-1 hover:underline" href="#">
                                <Link2 size={14} />
                                Link to Google Maps
                            </a>
                            </div>
                                <div className="flex bg-[#0c1322] border border-[#424754]/50 rounded p-1 items-center focus-within:border-[#adc6ff] focus-within:ring-1 focus-within:ring-[#adc6ff] transition-all">
                                <MapPin className="mx-3 text-[#c2c6d6]" size={18} />
                                <input 
                                    className="bg-transparent border-none text-[#dce2f7] focus:ring-0 text-sm w-full py-1.5 placeholder:text-[#c2c6d6]/40" 
                                    placeholder="Global Innovation Center, Room 402" 
                                    type="text"
                                    name="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* People Invitation tag Input Field */}
                        <div className="space-y-1">
                            <label 
                                className="text-xs font-semibold text-[#c2c6d6] tracking-wider">
                                        INVITE PEOPLE / ORGANIZATIONS
                            </label>
                            <div 
                                className="flex flex-wrap gap-2 p-3 min-h-[48px] items-center"
                            >   
                                {
                                    tags.length > 0 ? 
                                        (tags.map(({name, entityType}) => (
                                            <div key={name+entityType} className="bg-[#00a572] text-[#00311f] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold">
                                                <TagChip
                                                    name={name}
                                                    type={entityType}
                                                    onClickRemove={(event) => {handleRemoveTagEntity(event, name, entityType)}}
                                                />
                                            </div>
                                        ))) : 
                                    (<span 
                                        className="text-[#ffb786] italic text-sm"
                                    >
                                        No people or organization invited
                                    </span>)
                                }
                            </div>
                            <div className="flex flex-wrap items-center gap-2 p-3 bg-[#0c1322] border border-[#424754]/50 rounded min-h-[48px]">
                                <input 
                                    ref={entityNameRef}
                                    className="bg-transparent border-none focus:outline-none text-sm flex-1 min-w-[120px] text-[#dce2f7] placeholder:text-[#c2c6d6]/40 py-1" 
                                    placeholder="Search name or email..." 
                                    type="text"
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            handleInputEntity();
                                        }
                                    }}
                                />
                                <select 
                                    ref={entityTypeRef}
                                    className="bg-[#141b2d] border border-[#424754]/50 px-3 py-1.5 rounded text-sm text-[#dce2f7] focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] cursor-pointer"
                                    name="entityType"
                                >
                                    <option>PERSON</option>
                                    <option>ORGANIZATION</option>
                                    <option>INSTITUTION</option>
                                </select>
                                <button 
                                    className="cursor-pointer text-[#dce2f7] hover:text-[#adc6ff] p-1 flex items-center justify-center transition-colors" 
                                    type="button"
                                    onClick={() => handleInputEntity()}
                                > 
                                    <SendHorizonal size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Description Toolbar Rich Text Canvas Layout */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#c2c6d6] tracking-wider">DESCRIPTION / JOURNALING</label>
                            <div className="border border-[#424754]/50 rounded overflow-hidden">
                            <div className="flex items-center gap-4 px-4 py-2 bg-[#191f2f] border-b border-[#424754]/50">
                                <button className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors" type="button"><Bold size={16} /></button>
                                <button className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors" type="button"><Italic size={16} /></button>
                                <button className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors" type="button"><List size={16} /></button>
                                <button className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors" type="button"><Paperclip size={16} /></button>
                                <div className="ml-auto flex items-center gap-1.5 opacity-50">
                                <SpellCheck size={14} />
                                <span className="text-[10px] font-bold tracking-wider uppercase">Auto-save active</span>
                                </div>
                            </div>
                            <textarea 
                                className="w-full bg-[#0c1322] p-4 text-sm text-[#dce2f7] border-none resize-none focus:ring-0 placeholder:text-[#c2c6d6]/40" 
                                placeholder="Define goals, agenda, and pre-requisites here..." 
                                rows={6}
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                            </div>
                        </div>

                        {/* Form Action Submissions */}
                        <div className="pt-6 flex items-center justify-between border-t border-[#424754]/30">
                            <button className="px-6 py-2.5 border border-[#424754] rounded text-sm text-[#c2c6d6] font-bold hover:bg-[#2e3545]/40 transition-colors active:scale-95" 
                                type="button"
                            >
                            Save Draft
                            </button>
                            <div className="flex gap-4">
                            <Link href="/" className="px-6 py-2.5 text-sm text-[#c2c6d6] font-bold hover:text-[#dce2f7] transition-colors flex items-center">
                                Cancel
                            </Link>
                            <button className="px-8 py-2.5 bg-[#adc6ff] text-[#002e6a] font-bold rounded active:scale-95 transition-all shadow-lg shadow-[#adc6ff]/10" 
                                    type="submit"
                            >
                                Create Event
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Ambient Glowing Background Elements */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#adc6ff]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-[#4edea3]/5 blur-[100px] rounded-full pointer-events-none"></div>
        </main>
    </div>
    );
}